import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward, PlayArrowOutlined } from "@mui/icons-material";
import { AppContext } from '../hooks/AppContext';

//Import Components
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


function createData(no, pay_id, pred_status, true_status, conf_sc) {
  return { no, pay_id, pred_status, true_status, conf_sc };
}

const customOrder = ['Serial Number', 'Payment ID', 'Name of the card holder', 'Card Hash', 'Card Bin', 'Amount', 'Currency'];

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


const TransactionTable = () => {
    const { day, setDay, serial, setSerial, results, setResults, transaction, setTransaction, matrix, setMatrix } = useContext(AppContext);
    
    useEffect(() => {
        const fetchInitialTransaction = async () => {
          const initialTransaction = {
            "Amount": "",
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

    const handlePrev = async () => {
        const newSerial = Math.max(0, serial - 1);
        setSerial(newSerial);
        const newTransaction = await fetchTransaction(newSerial, day);
        setTransaction([newTransaction]);
    };

    const handleNext = async () => {
        const newSerial = Math.min(29, serial + 1);
        setSerial(newSerial);
        const newTransaction = await fetchTransaction(newSerial, day);
        setTransaction(newTransaction);
    };

    const handleRun = async () => {

      setResults([]);
      for (let newSerial = 0; newSerial < 30; newSerial++) {
          const newTransaction = await fetchTransaction(newSerial, day);
          setTransaction([newTransaction]);
          setSerial(newSerial);
          const result = await predictFraud(newSerial, day);
          const newResult = createData(newSerial + 1, result.payment_id, result.predicted, result.actual, result.confidence);
          setResults((prevResults) => [...prevResults, newResult]);

          setMatrix((prevMatrix) => {
            const [tp, fp, tn, fn] = prevMatrix;
            if (result.payment_id === 'Fraudulent' && result.predicted === 'Fraudulent') {
              return [tp + 1, fp, tn, fn];
            } else if (result.payment_id !== 'Fraudulent' && result.predicted === 'Fraudulent') {
              return [tp, fp + 1, tn, fn];
            } else if (result.payment_id !== 'Fraudulent' && result.predicted !== 'Fraudulent') {
              return [tp, fp, tn + 1, fn];
            } else if (result.payment_id === 'Fraudulent' && result.predicted !== 'Fraudulent') {
              return [tp, fp, tn, fn + 1];
            }
            return prevMatrix;
          });

          setDay(0); // Running Status for Button
          await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 100));
      }

      if (day < 5) {
        setDay(day + 1);
      }

    };

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
        <div className="button-container">
          <ProgressBar className="progressbar"/>
          <Button variant="contained" className="btn" id="run" endIcon={<PlayArrowOutlined />} onClick={handleRun} disableElevation>
            {day != 0 ? "Run Day " + day : "Running..."}
          </Button>
        </div>
        <div>
          TODO: FIX THE MATRIX {matrix[0]} {matrix[1]} {matrix[2]} {matrix[3]}

        </div>
        </TableContainer>
    );
};
  
export default TransactionTable;