import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { PlayArrowOutlined } from "@mui/icons-material";
import { AppContext } from '../hooks/AppContext';

import ProgressBar from './ProgressBar';


const fetchTransaction = async (serial, day) => {
  const response = await fetch('/fetch-transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: serial, day: day })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const row = await response.json();
  return row;
};

const predictFraud = async (serial, day) => {
  const response = await fetch('/predict-fraud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: serial, day: day })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const row = await response.json();
  return row;
}


function createData(no, pay_id, date, pred_status, true_status, conf_sc) {
  return { no, pay_id, date, pred_status, true_status, conf_sc };
}

const customOrder = ['Serial Number', 'Date Time', 'Payment ID', 'Name of the card holder', 'Card Hash', 'Card Bin', 'Amount', 'Currency'];

const transposeData = (data) => {
  if (!data || data.length === 0) {
    return [];
  }
  const keys = customOrder.length > 0 ? customOrder : Object.keys(data[0]);
  return keys.map((key) => ({
    key,
    values: data.map((item) => item[key]),
  }));
};


const RunButton = () => {
  const { day, setDay, setTransaction, setSerial, setResults, setMatrix, setMetrics} = useContext(AppContext);

  const handleRun = async () => {
    setResults([]);
    setMatrix([0, 0, 0, 0]);
    let finalMatrix = [0, 0, 0, 0];

    for (let newSerial = 0; newSerial < 30; newSerial++) {
        const newTransaction = await fetchTransaction(newSerial, day);
        setTransaction([newTransaction]);
        setSerial(newSerial);
        const result = await predictFraud(newSerial, day);
        const newResult = createData(newSerial + 1, result.payment_id, result.date, result.predicted, result.actual, result.confidence);
        setResults((prevResults) => [...prevResults, newResult]);

        finalMatrix = ((prevMatrix) => {
          const [tp, fn, fp, tn] = prevMatrix;
          let newMatrix;
          if (result.predicted === 'Fraudulent' && result.actual === 'Fraudulent') {
            newMatrix = [tp + 1, fn, fp, tn];
          } else if (result.predicted === 'Legitimate' && result.actual === 'Fraudulent') {
            newMatrix = [tp, fn + 1, fp, tn];
          } else if (result.predicted === 'Fraudulent' && result.actual === 'Legitimate') {
            newMatrix = [tp, fn, fp + 1, tn];
          } else if (result.predicted === 'Legitimate' && result.actual === 'Legitimate') {
            newMatrix = [tp, fn, fp, tn + 1];
          } else {
            newMatrix = prevMatrix;
          }
          return newMatrix;
        })(finalMatrix);
        
        setMatrix(finalMatrix);

        setDay(0); // Running Status for Button
        await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 100));
    }

    setMetrics((prevMetrics) => [...prevMetrics, {
      day: day,
      precision: (finalMatrix[0] / (finalMatrix[0] + finalMatrix[2])) * 100,
      recall: (finalMatrix[0] / (finalMatrix[0] + finalMatrix[1])) * 100,
      f1: 100 * (2 * (finalMatrix[0] / (finalMatrix[0] + finalMatrix[2])) * (finalMatrix[0] / (finalMatrix[0] + finalMatrix[1]))) / ((finalMatrix[0] / (finalMatrix[0] + finalMatrix[2])) + (finalMatrix[0] / (finalMatrix[0] + finalMatrix[1]))),
      fp: (finalMatrix[2]),
      fn: (finalMatrix[1])
    }]);


    if (day < 5) {
      setDay(day + 1);
    }
  }

  return (
    <div className="button-container">
      <ProgressBar className="progressbar"/>
      <Button variant="contained" className="btn" id="run" endIcon={<PlayArrowOutlined />} onClick={handleRun} disableElevation disabled={day === 0}>
      {day != 0 ? "Run Day " + day : "Running..."}
      </Button>
    </div>
  );
}


const TransactionTable = () => {
    const { day, setDay, serial, setSerial, results, setResults, transaction, setTransaction, matrix, setMatrix } = useContext(AppContext);
    
    useEffect(() => {
        const fetchInitialTransaction = async () => {
          const initialTransaction = {
            "Amount": "",
            "Date Time": "",
            "Card Bin": "",
            "Card Hash": "",
            "Currency": "",
            "Name of the card holder": "", 
            "Payment ID": "",
            "Serial Number": ""
          }
          setTransaction([initialTransaction]);
        };
        
        fetchInitialTransaction();
    }, []);

    const transposedTransactions = transposeData(transaction);

    return (
        <TableContainer component={Paper} elevation={0}>
        <Table className="simple-table" size="small" aria-label="simple table">
            <TableBody className='table-body'>
            {transposedTransactions.map((row) => (
                <TableRow className='table-row' key={row.key}>
                <TableCell component="th" scope="row">
                    <strong>{row.key}</strong>
                </TableCell>
                {row.values.map((value, index) => (
                    <TableCell key={index} align="right">
                    {value}
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <RunButton />
        </TableContainer>
      );
};
  
export default TransactionTable;