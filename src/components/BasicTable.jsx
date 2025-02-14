import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward, PlayArrowOutlined} from "@mui/icons-material";
// Example data to display in the table

const response = await fetch('/fetch-transaction')

const row = await response.json()
console.log(row)

const rows = [row]

// Function to transpose data
const transposeData = (data) => {
  const keys = Object.keys(data[0]);
  return keys.map((key) => ({
    key,
    values: data.map((item) => item[key]),
  }));
};

// Transposed rows
const transposedRows = transposeData(rows);



const BasicTable = () => {
    return (
        <><TableContainer component={Paper} elevation={0}>
        <Table className="simple-table" size="small" aria-label="simple table">
          <TableBody className='table-body'>
            {transposedRows.map((row) => (
              <TableRow className='table-row' key={row.key}>
                <TableCell component="th" scope="row">
                  <strong>{row.key}</strong>
                </TableCell>
                {row.values.map((value, index) => (
                  <TableCell key={index} align="right">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer><div className="button-container">
          <Button variant="contained" className="btn" startIcon={<ArrowBack />} disableElevation>
            Previous
          </Button>
          <Button variant="contained" className="btn" endIcon={<ArrowForward />} disableElevation>
            Next
          </Button>
          <Button variant="contained" className="btn" id="run" endIcon={<PlayArrowOutlined />} disableElevation>
            Run
          </Button>
        </div></>
    );
  }
export default BasicTable