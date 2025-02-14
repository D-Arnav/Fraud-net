import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EastRounded } from '@mui/icons-material';

// Example data to display in the table

const response = await fetch('/fetch-transaction')

const row = await response.json()
console.log(row)

const rows = [row]

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
                    <strong>{row  .key}</strong>
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


// Backend Part

// 1. On page load, use /fetch-first-transaction to get the first transaction

// 2. On clicking Next, use /fetch-next-transaction with the current transaction id to fetch next.
//    If transaction id is the last one, this should do nothing
// 

// 3. On clicking Previous, use /fetch-prev-transaction with the current transaction id to fetch prev.
//    If transaction id is the first one, this should do nothing