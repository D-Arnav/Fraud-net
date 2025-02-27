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
        </TableContainer>
      );
};
  
export default TransactionTable;