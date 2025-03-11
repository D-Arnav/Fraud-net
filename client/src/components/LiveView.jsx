import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const transaction = {
  "Serial Number": "9493786284",
  "Payment ID": "9493786284",
  "Name of the card holder": "John Doe",
  "Card Hash": "1234 1234 1234 1234",
  "Card Bin": "123456",
  "Amount": "123",
  "Currency": "USD"
};

const LiveView = () => {
  return (
    <div className="liveview-container">
    <h3 className="side-heading">Live View</h3>
    <TableContainer component={Paper} elevation={0} className="table-container">
        <Table size="small" aria-label="simple table">
        <TableBody>
            {Object.entries(transaction).map(([key, value]) => (
            <TableRow key={key} className="table-row">
                <TableCell className="label-cell">{key}</TableCell>
                <TableCell className="value-cell" align="right">{value}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    </div>
  );
};

export default LiveView;
