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


const fetchTransaction = async () => {
  const response = await fetch('/fetch-random-transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const row = await response.json();
  return row;
};

const predictFraud = async (payment_id) => {
  const response = await fetch('/predict-random-fraud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ payment_id: payment_id})
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const row = await response.json();
  return row;
}


function createData(pay_id, date, pred_status, true_status, conf_sc) {
  return { pay_id, date, pred_status, true_status, conf_sc };
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


const TransactionTable = () => {
    const {liveSerial, setLiveSerial, setStatus, transaction, setTransaction } = useContext(AppContext);
    
    useEffect(() => {
        if (transaction) {
          return;
        }

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

    const handleRun = () => {
      const intervalId = setInterval(async () => {
        const newTransaction = await fetchTransaction();
        setLiveSerial(prevLiveSerial => {
          const newLiveSerial = prevLiveSerial + 1;
          newTransaction['Serial Number'] = newLiveSerial;
          return newLiveSerial;
        });
        setTransaction([newTransaction]);
        const result = await predictFraud(newTransaction['Payment ID']);
        const newResult = createData(result.payment_id, result.date, result.predicted, result.actual, result.confidence);
        setStatus((prevResults) => [...prevResults, newResult]);
      }, 2500);
      return () => clearInterval(intervalId);
    };

    useEffect(() => {
      const stopInterval = handleRun();
      return () => stopInterval();
    }, []);

    const transposedTransactions = transposeData(transaction);

    return (
        <TableContainer component={Paper} elevation={0} className='table-container'>
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
        </TableContainer>
      );
};
  
export default TransactionTable;