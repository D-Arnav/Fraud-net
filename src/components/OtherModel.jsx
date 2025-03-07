import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Neural Network', 159, 6.0, 24, 4.0),
  createData('Decision Tree', 237, 9.0, 37, 4.3),
  createData('Random Forest', 262, 16.0, 24, 6.0),
  createData('SVM', 305, 3.7, 67, 4.3),
  createData('Logistic Regression', 356, 16.0, 49, 3.9),
];

const OtherModel = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Models</TableCell>
            <TableCell align="right">Metric 1</TableCell>
            <TableCell align="right">Metric 2</TableCell>
            <TableCell align="right">Metric 3</TableCell>
            <TableCell align="right">Metric 4</TableCell>
            <TableCell align="right">Metric 5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OtherModel;
