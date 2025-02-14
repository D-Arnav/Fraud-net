import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Function to transpose data for better table visualization
const transposeData = (data) => {
  if (!data || data.length === 0) return [];
  const keys = Object.keys(data[0]);
  return keys.map((key) => ({
    key,
    values: data.map((item) => item[key]),
  }));
};

const BasicTable = () => {
  const [transaction, setTransaction] = useState(null);
  const [transposedRows, setTransposedRows] = useState([]);

  // Fetch first transaction on component mount
  useEffect(() => {
    fetchFirstTransaction();
  }, []);

  // Fetch first transaction
  const fetchFirstTransaction = async () => {
    try {
      const response = await fetch('/fetch-first-transaction');
      const data = await response.json();
      if (data) {
        setTransaction(data);
        setTransposedRows(transposeData([data]));
      }
    } catch (error) {
      console.error('Error fetching first transaction:', error);
    }
  };

  // Fetch next transaction
  const fetchNextTransaction = async () => {
    if (!transaction || !transaction.id) return;

    try {
      const response = await fetch(`/fetch-next-transaction?id=${transaction.id}`);
      const data = await response.json();
      
      if (data) {
        setTransaction(data);
        setTransposedRows(transposeData([data]));
      }
    } catch (error) {
      console.error('Error fetching next transaction:', error);
    }
  };

  // Fetch previous transaction
  const fetchPrevTransaction = async () => {
    if (!transaction || !transaction.id) return;

    try {
      const response = await fetch(`/fetch-prev-transaction?id=${transaction.id}`);
      const data = await response.json();

      if (data) {
        setTransaction(data);
        setTransposedRows(transposeData([data]));
      }
    } catch (error) {
      console.error('Error fetching previous transaction:', error);
    }
  };
  
  return (
    <div>
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
      </TableContainer>

      {/* Navigation Buttons
      <div className="button-container">
        <Button variant="contained" className="btn" onClick={fetchPrevTransaction}>
          Previous
        </Button>
        <Button variant="contained" className="btn" onClick={fetchNextTransaction}>
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default BasicTable;
