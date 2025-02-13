import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead'; // Import TableHead
import Paper from '@mui/material/Paper';

function createData(no, pay_id, pred_status, true_status, conf_sc) {
  return { no, pay_id, pred_status, true_status, conf_sc };
}

const rows1 = [
  createData(1, 9493786284, "Fraudulent", "Fraudulent", 0.78483),
  createData(2, 8628494937, "Legitimate", "Fraudulent", 0.56714),
  createData(3, 8628494937, "Legitimate", "Legitimate", 0.56714),
];

export default class NormalTable extends Component {
  render() {
    return (
      <TableContainer className="result-table" component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>S.No</b></TableCell>
              <TableCell align="center"><b>Payment ID</b></TableCell>
              <TableCell align="center"><b>Predicted Status</b></TableCell>
              <TableCell align="center"><b>True Status</b></TableCell>
              <TableCell align="center"><b>Confidence Score</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows1.map((row) => (
              <TableRow
                key={row.no} // Use row.no as the key instead of row.name
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.no}
                </TableCell>
                <TableCell align="center">{row.pay_id}</TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: row.pred_status === "Legitimate" ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {row.pred_status}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: row.true_status === "Legitimate" ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {row.true_status}
                </TableCell>
                <TableCell align="center">{row.conf_sc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
