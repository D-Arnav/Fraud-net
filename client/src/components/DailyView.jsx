import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function createData(date, legit, fraud, prec, rec, fnr, fpr) {
  return { date, legit, fraud, prec, rec, fnr, fpr };
}

export default function DailyView() {

  const { dailyViewTable, selectedDate } = useContext(AppContext);
  
  return (
    <div className="dailyview-container">
      <h3 className="side-heading">Daily View</h3>
      <TableContainer component={Paper} elevation={0} className="table-container">
        <Table className="dailyview-table" size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Date</b></TableCell>
              <TableCell align="center"><b># Legitimate</b></TableCell>
              <TableCell align="center"><b># Fraudulent </b></TableCell>
              <TableCell align="center"><b>Precision</b></TableCell>
              <TableCell align="center"><b>Recall</b></TableCell>
              <TableCell align="center"><b>False Negative Rate %</b></TableCell>
              <TableCell align="center"><b>False Positive Rate %</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyViewTable.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.num_legitimate}</TableCell>
                <TableCell align="center">{row.num_fraudulent}</TableCell>
                <TableCell align="center">{row.precision}</TableCell>
                <TableCell align="center">{row.recall}</TableCell>
                <TableCell align="center">{row.false_negative_rate}</TableCell>
                <TableCell align="center">{row.false_positive_rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>    
        </Table>
      </TableContainer>
    </div>
  );
}
