import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {Download} from "@mui/icons-material";
import { AppContext } from '../hooks/AppContext';

function createData(no, pay_id, pred_status, true_status, conf_sc) {
  return { no, pay_id, pred_status, true_status, conf_sc };
}

const rows1 = [
  createData(1, 9493786284, "Fraudulent", "Fraudulent", 0.78483),
  createData(2, 8628494937, "Legitimate", "Fraudulent", 0.56714),
  createData(3, 8628494937, "Legitimate", "Legitimate", 0.56714),
];

const ResultsTable = () => {
  const { day, setDay, serial, setSerial, results, transaction, setTransaction, matrix, setMatrix } = useContext(AppContext);

  const downloadCSV = () => {
    const headers = ["S.No", "Payment ID", "Predicted Status", "True Status", "Confidence Score"];
    const rows = results.map(row => [row.no, row.pay_id, row.pred_status, row.true_status, row.conf_sc]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <><TableContainer className="result-table" component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>S.No</b></TableCell>
            <TableCell align="center"><b>Payment ID</b></TableCell>
            <TableCell align="center"><b>Predicted Status</b></TableCell>
            <TableCell align="center"><b>True Status</b></TableCell>
            <TableCell align="center"><b>Confidence Score</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => (
            <TableRow key={row.no}>
              <TableCell align="center">{row.no}</TableCell>
              <TableCell align="center">{row.pay_id}</TableCell>
              <TableCell
                align="center"
                style={{
                  color: row.pred_status === "Legitimate" ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {row.pred_status}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: row.true_status === "Legitimate" ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {row.true_status}
              </TableCell>
              <TableCell align="center">{row.conf_sc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="button-container">
        <Button variant="contained" className="btn" onClick={downloadCSV} endIcon={<Download />} disableElevation>
          Download
        </Button>
    </div></>
  );
};

export default ResultsTable;