import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Import components
import BasicTable from './components/BasicTable';
import NormalTable from './components/NormalTable';

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
    <Box className="tabs">
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
          <div className="center-container">
            <BasicTable />
          </div>
          {/* spacing between tables */}
          <Box sx={{ height: 32 }} />
          <hr className="pagebre" />
          <NormalTable />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </Box>
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
