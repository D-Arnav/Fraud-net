import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward, PlayArrowOutlined } from "@mui/icons-material";


const fetchTransaction = async (serial) => {
  const response = await fetch('/fetch-transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: serial })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const row = await response.json();
  return row;
};

const predictFraud = async (serial) => {
  const response = await fetch('/predict-fraud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: serial })
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


const TransactionTable = ({ serial, setSerial, results, setResults}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchInitialTransaction = async () => {
          const initialRow = await fetchTransaction(0);
          setRows([initialRow]);
        };
        
        fetchInitialTransaction();
    }, []);

    const handlePrev = async () => {
        const newSerial = Math.max(0, serial - 1);
        setSerial(newSerial);
        const newRow = await fetchTransaction(newSerial);
        setRows([newRow]);
    };

    const handleNext = async () => {
        const newSerial = Math.min(29, serial + 1);
        setSerial(newSerial);
        const newRow = await fetchTransaction(newSerial);
        setRows([newRow]);
    };

    const handleRun = async () => {
        const row = await predictFraud(serial);
        console.log(row)
        setResults([...results, createData(serial+1, row.payment_id, row.predicted, row.actual, row.confidence)])
    };

    const transposedRows = transposeData(rows);

    return (
        <TableContainer component={Paper} elevation={0}>
        <Table className="simple-table" size="small" aria-label="simple table">
            <TableBody className='table-body'>
            {transposedRows.map((row) => (
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
            <Button variant="contained" className="btn" startIcon={<ArrowBack />} onClick={handlePrev} disableElevation>
            Previous
            </Button>
            <Button variant="contained" className="btn" endIcon={<ArrowForward />} onClick={handleNext} disableElevation>
            Next
            </Button>
            <Button variant="contained" className="btn" id="run" endIcon={<PlayArrowOutlined />} onClick={handleRun} disableElevation>
            Run
            </Button>
        </div>
        </TableContainer>
    );
};
  
export default TransactionTable;