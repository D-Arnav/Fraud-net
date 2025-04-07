import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { PlayArrowOutlined } from "@mui/icons-material";
import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import determineColor from '../utils/determineColor';
import downloadTable from '../utils/downloadTable';

export default function Merchant() {

  const { merchant } = useContext(AppContext);

  const handleDownload = () => {
    downloadTable(merchant, 'merchant_table');
  };

  function RunButton({ onRunClick }) {
    return (
      <Button 
        variant="contained" 
        className="btn" 
        id="run" 
        endIcon={<PlayArrowOutlined />} 
        disableElevation 
        onClick={onRunClick}
      >
        Run
      </Button>
    );
  }

  // const handleRunClick = () => {
  //   setIsRunning(true);
  //   updateDailyView();
  // };

  return (
    <>
      <div className="search_section">
        <h3 className="search-title">Merchant Group</h3>
        <p> search bar </p>
        <RunButton />
      </div>
      <TableContainer component={Paper} elevation={0} className="table-container" sx={{ width: '100% !important'}}>
      <Table className="dailyview-table" size="small" aria-label="simple table">
        <TableHead>
          <TableRow className="table-header">
            <TableCell align="center"><b>Merchant</b></TableCell>
            <TableCell align="center"><b># Legit</b></TableCell>
            <TableCell align="center"><b># Fraud</b></TableCell>
            <TableCell align="center"><b>Precision</b></TableCell>
            <TableCell align="center"><b>Recall</b></TableCell>
            <TableCell align="center"><b>FNR %</b></TableCell>
            <TableCell align="center"><b>FPR %</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merchant.map((row, index) => (
            <TableRow key={index} className="table-row">
              <TableCell align="center">
                <span>{row.merchant}</span>
              </TableCell>
              <TableCell align="center">
                <span>{row.num_legitimate}</span>
              </TableCell>
              <TableCell align="center">
                <span>{row.num_fraudulent}</span>
              </TableCell>
              <TableCell align="center">
                <span className={determineColor('precision', 100 * row.precision) + " bold"}>{(100 * row.precision).toFixed(2)}%</span>
              </TableCell>
              <TableCell align="center">
                <span className={determineColor('recall', 100 * row.recall) + " bold"}>{(100 * row.recall).toFixed(2)}%</span>
              </TableCell>
              <TableCell align="center">
                <span className={determineColor('fnr', 100 * row.false_negative_rate) + " bold"}>{(row.false_negative_rate * 100).toFixed(2)}%</span>
              </TableCell>
              <TableCell align="center">
                <span className={determineColor('fpr', 100 * row.false_positive_rate) + " bold"}>{(row.false_positive_rate * 100).toFixed(2)}%</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
