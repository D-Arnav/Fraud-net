import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Example data to display in the table
const rows = [
  { 
    'Serial Number': 1, 
    'Payment ID': 9493786284, 
    'Name of the card holder': 'John Doe', 
    'Card Hash': '1234 1234 1234 1234', 
    'Card Bin': 123456, 
    'Amount': 212, 
    'Currency': 'USD' 
  },
];

// Function to transpose data
const transposeData = (data) => {
  const keys = Object.keys(data[0]);
  return keys.map((key) => ({
    key,
    values: data.map((item) => item[key]),
  }));
};

// Transposed rows
const transposedRows = transposeData(rows);

export default class BasicTable extends Component {
  render() {
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
        </TableContainer>
    );
  }
}
