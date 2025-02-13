import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function Title() {
  return (
    <Box className="title">
      <h1>Fraud detection testing</h1>
    </Box>
  );
}

function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="table">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Live Transactions" value="1" />
            <Tab label="Transactional" value="2" />
            <Tab label="Batch" value="3" />
            <Tab label="Performance Analysis" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BasicTable />
          <div></div>
          <NormalTable />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </Box>
  );
}

// Live Transactions table
const rows = [
  { 
    'Serial Number': 1, 
    'Payment ID': 9493786284, 
    'Name of the card holder': 'John Doe', 
    'Card Hash': '1234 1234 1234 1234', 
    'Card Bin': 123456, 
    'Amount': 212, 
    'Currency': 'USD' 
  },
];

const transposeData = (data) => {
  const keys = Object.keys(data[0]);
  return keys.map((key) => ({
    key,
    values: data.map((item) => item[key]),
  }));
};

const transposedRows = transposeData(rows);

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table className="simple-table" aria-label="simple table">
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
    </TableContainer>
  );
}

// Results table
function createData(no, pay_id, pred_status, true_status, conf_sc) {
  return { no, pay_id, pred_status, true_status, conf_sc };
}

const rows1 = [
  createData(1, 9493786284, "Fraudulent", "Fraudulent", 0.78483),
  createData(2, 8628494937, "Legitimate", "Fraudulent", 0.56714),
  createData(3, 8628494937, "Legitimate", "Legitimate", 0.56714),
];

function NormalTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell align="right">Payment ID</TableCell>
            <TableCell align="right">Predicted Status</TableCell>
            <TableCell align="right">True Status</TableCell>
            <TableCell align="right">Confidence Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.no}
              </TableCell>
              <TableCell align="right">{row.pay_id}</TableCell>
              <TableCell align="right">{row.pred_status}</TableCell>
              <TableCell align="right">{row.true_status}</TableCell>
              <TableCell align="right">{row.conf_sc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function App() {
  return (
    <div>
      <Title />
      <LabTabs />
    </div>
  );
}

export default App;