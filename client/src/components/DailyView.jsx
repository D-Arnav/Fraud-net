import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(date, legit, fraud, prec, rec, fnr, fpr) {
  return { date, legit, fraud, prec, rec, fnr, fpr };
}

const rows = [
  createData("08-03-2025", 9493786284, "Fraudulent", 0.78483, 0.85, 0.10, 0.05),
  createData("08-03-2025", 9493786284, "Fraudulent", 0.78483, 0.85, 0.10, 0.05),
  createData("08-03-2025", 9493786284, "Fraudulent", 0.78483, 0.85, 0.10, 0.05),
  createData("08-03-2025", 9493786284, "Fraudulent", 0.78483, 0.85, 0.10, 0.05),
  createData("08-03-2025", 9493786284, "Fraudulent", 0.78483, 0.85, 0.10, 0.05),
];

export default function DailyView() {
  return (
    <div className="dailyview-container">
      <h3 className="side-heading">Daily View</h3>
      <TableContainer component={Paper} elevation={0} className="table-container">
        <Table className="dailyview-table" size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Date</b></TableCell>
              <TableCell align="center"><b>#Legit</b></TableCell>
              <TableCell align="center"><b>#Fraud</b></TableCell>
              <TableCell align="center"><b>Prec</b></TableCell>
              <TableCell align="center"><b>Rec</b></TableCell>
              <TableCell align="center"><b>FNR%</b></TableCell>
              <TableCell align="center"><b>FPR%</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.legit}</TableCell>
                <TableCell align="center">{row.fraud}</TableCell>
                <TableCell align="center">{row.prec}</TableCell>
                <TableCell align="center">{row.rec}</TableCell>
                <TableCell align="center">{row.fnr}</TableCell>
                <TableCell align="center">{row.fpr}</TableCell>
              </TableRow>
            ))}
          </TableBody>    
        </Table>
      </TableContainer>
      <p>Add download button to the right end</p>
    </div>
  );
}
