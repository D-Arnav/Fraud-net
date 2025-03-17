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
  createData("Logistic Regression", "0.00%", "0.00%", "100.00%", "0.00%"),
  createData("Support Vector Machine", "0.00%", "0.00%", "100.00%", "0.00%"),
  createData("Decision Tree", "17.14%", "2.73%", "97.27%", "0.08%"),
  createData("Decision Tree + Class Balance", "10.36%", "16.82%", "83.18%", "0.91%"),
  createData("Decision Tree + Tomek + Class Balance", "10.14%", "16.82%", "83.18%", "0.93%"),
  createData("Random Forest", "19.23%", "2.27%", "97.73%", "0.06%"),
  createData("Random Forest + Class Balance", "10.61%", "9.55%", "90.45%", "0.50%"),
  createData("Random Forest + Tomek", "16.67%", "2.27%", "97.73%", "0.07%"),
  createData("Random Forest + Tomek + Class Balance", "11.39%", "10.45%", "89.55%", "0.51%"),
  createData("Neural Network", "6.72%", "59.09%", "40.91%", "5.13%")
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
                <TableCell align="Left" className="models-column">{row.model}</TableCell>
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
