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
import determineColor from '../utils/determineColor';
import downloadTable from '../utils/downloadTable';



export default function DailyView() {

  const { dailyViewTable } = useContext(AppContext);

  const handleDownload = () => {
    downloadTable(dailyViewTable, 'daily_view_table');
  };

  return (
      <TableContainer component={Paper} elevation={0} className="table-container">
          <Table className="dailyview-table" size="small" aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell align="center"><b>Date</b></TableCell>
              <TableCell align="center"><b># Legit</b></TableCell>
              <TableCell align="center"><b># Fraud</b></TableCell>
              <TableCell align="center"><b>Precision</b></TableCell>
              <TableCell align="center"><b>Recall</b></TableCell>
              <TableCell align="center"><b>FNR %</b></TableCell>
              <TableCell align="center"><b>FPR %</b></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {dailyViewTable.map((row, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell align="center">
                    <span>{row["Date"]}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row["# Legitimate"]}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row["# Fraudulent"]}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor("Precision", row["Precision"])}>{row["Precision"]}%</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor("Recall", row["Recall"])}>{row["Recall"]}%</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor("FNR", row["FNR"])}>{row["FNR"]}%</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor("FPR", row["FPR"])}>{row["FPR"]}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>    
          </Table>
      </TableContainer>
  );
}
