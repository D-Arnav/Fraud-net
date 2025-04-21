import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { AppContext } from '../context/AppContext';

import computeScore from '../utils/computeScore';
import { colors } from '@mui/material';

export default function Results() {

  const { resultsTable } = useContext(AppContext);
  
  return (
    <div className="results-container">
    <div className="results-header">
      <h3 className="side-heading">Results</h3>
      <p className="score">Score: {computeScore(resultsTable)}%</p>
    </div>
      <TableContainer component={Paper} elevation={0} className="table-container">
        <Table className="result-table" size="small" aria-label="simple table">
        <TableHead>
        <TableRow className="table-header"> 
            <TableCell align="center"><b>S.No.</b></TableCell>
            <TableCell align="center"><b>Date</b></TableCell>
            <TableCell align="center"><b>Payment ID</b></TableCell>
            <TableCell align="center"><b>Recommendation</b></TableCell>
            <TableCell align="center"><b>Probability of Fraud</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            { resultsTable.map((row) => (
            <TableRow key={row.sno} className="table-row">
                <TableCell align="center">{row["S.No."]}</TableCell>
                <TableCell align="center">{row["Date"]}</TableCell>
                <TableCell align="center">{row["PaymentID"]}</TableCell>
                <TableCell align="center">
                  <span className={row["Recommendation"] == 'Accept' ? 'green bold' : 'red bold'}>{row["Recommendation"]}</span>
                </TableCell>
                <TableCell align="center">{row["Prob Fraud"]}</TableCell>
            </TableRow>
            ))}
        </TableBody>    
        </Table>
    </TableContainer>
    </div>
  );
}
