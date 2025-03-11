import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(sno, date, payid, pred, conf) {
  return { sno, date, payid, pred, conf };
}

const rows = [
  createData(1, "08-03-2025", 9493786284, "Fraudulent", 0.78483),
  createData(1, "08-03-2025", 9493786284, "Fraudulent", 0.78483),
  createData(1, "08-03-2025", 9493786284, "Fraudulent", 0.78483),
  createData(1, "08-03-2025", 9493786284, "Fraudulent", 0.78483),
  createData(1, "08-03-2025", 9493786284, "Fraudulent", 0.78483),
];

export default function Results() {
  return (
    <div className="results-container">
    <h3 className="side-heading">Results</h3>
    <TableContainer component={Paper} elevation={0} className="table-container">
        <Table className="result-table" size="small" aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell align="center"><b>S.No</b></TableCell>
            <TableCell align="center"><b>Date</b></TableCell>
            <TableCell align="center"><b>Payment ID</b></TableCell>
            <TableCell align="center"><b>Predicted Status</b></TableCell>
            <TableCell align="center"><b>Confidence Score</b></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.sno} className="table-row">
                <TableCell align="center">{row.sno}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.payid}</TableCell>
                <TableCell 
                align="center" 
                className={row.pred === "Legitimate" ? "status-legitimate" : "status-fraudulent"}>
                {row.pred}
                </TableCell>
                <TableCell align="center">{row.conf}</TableCell>
            </TableRow>
            ))}
        </TableBody>    
        </Table>
    </TableContainer>
    <p>Score: --%</p>
    </div>
  );
}
