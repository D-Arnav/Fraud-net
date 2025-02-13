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

// Heading title
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
          {/* spacing between tables */}
          <Box sx={{ height:32 }}></Box> 
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
    <TableContainer component={Paper} elevation={0}>
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
    <TableContainer className="result-table" component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650}} size="small" aria-label="simple table">
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
          {rows1.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.no}
              </TableCell>
              <TableCell align="center">{row.pay_id}</TableCell>
              <TableCell align="center" style={{ color: row.pred_status === "Legitimate" ? 'green' : 'red', fontWeight: 'bold'}}>
                {row.pred_status}
              </TableCell>
              <TableCell align="center" style={{ color: row.true_status === "Legitimate" ? 'green' : 'red', fontWeight: 'bold'}}>
                {row.true_status}
              </TableCell>
              <TableCell align="center">{row.conf_sc}</TableCell>
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