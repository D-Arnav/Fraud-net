import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(model, prec, recall, fnr, fpr) {
  return { model, prec, recall, fnr, fpr };
}

const rows = [
  createData("Neural Network", 150, 0.6, 23, 4.3),
  createData("Decision Tree", 237, 0.38, 54, 1.6),
  createData("Random Forest", 262, 0.85, 23, 3.5),
  createData("SVM", 305, 0.54, 16, 8.3),
  createData("Logistic Regression", 356, 0.5, 26, 1.6),
];

export default function Models() {
  return (
    <div className="models-container">
      <h3 className="side-heading">Models Version Comparison</h3>
      <TableContainer component={Paper} elevation={0} className="models-table-container">
        <Table className="models-table" size="small" aria-label="models table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Models</b></TableCell>
              <TableCell align="center"><b>Precision</b></TableCell>
              <TableCell align="center"><b>Recall</b></TableCell>
              <TableCell align="center"><b>FNR</b></TableCell>
              <TableCell align="center"><b>FPR</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.model} className="models-table-row">
                <TableCell align="center" className="models-column">{row.model}</TableCell>
                <TableCell align="center">{row.prec}</TableCell>
                <TableCell align="center">{row.recall}</TableCell>
                <TableCell align="center">{row.fnr}</TableCell>
                <TableCell align="center">{row.fpr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
