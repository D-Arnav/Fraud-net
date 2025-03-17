import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Download } from "@mui/icons-material";
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
    <div className="dailyview-container">
      <TableContainer component={Paper} elevation={0} className="table-container">
        <div className="table-scroll" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <Table className="dailyview-table" size="small" aria-label="simple table">
          <TableHead>
            <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#111112'}}>
              <TableCell align="center"><b>Date</b></TableCell>
              <TableCell align="center"><b># Legitimate</b></TableCell>
              <TableCell align="center"><b># Fraudulent</b></TableCell>
              <TableCell align="center"><b>Precision</b></TableCell>
              <TableCell align="center"><b>Recall</b></TableCell>
              <TableCell align="center"><b>False Negative Rate %</b></TableCell>
              <TableCell align="center"><b>False Positive Rate %</b></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {dailyViewTable.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <span>{row.date}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row.num_legitimate}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{row.num_fraudulent}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor('precision', 100 * row.precision)}>{(100 * row.precision).toFixed(2)}%</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor('recall', 100 * row.recall)}>{(100 * row.recall).toFixed(2)}%</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor('fnr', 100 * row.false_negative_rate)}>{(row.false_negative_rate * 100).toFixed(2)}%</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className={determineColor('fpr', 100 * row.false_positive_rate)}>{(row.false_positive_rate * 100).toFixed(2)}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>    
          </Table>
        </div>
      </TableContainer>
    </div>
  );
}
