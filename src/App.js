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
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </Box>
  );
}

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
        <TableBody>
          {transposedRows.map((row) => (
            <TableRow key={row.key}>
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

function App() {
  return (
    <div>
      <Title />
      <LabTabs />
    </div>
  );
}

export default App;
