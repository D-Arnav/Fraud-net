import "./App.css";
import 'inter-ui/inter.css';
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward, PlayArrowOutlined, Download } from "@mui/icons-material";
 
// Import components
import BasicTable from "./components/BasicTable";
import NormalTable from "./components/NormalTable";
import ConfusionMatrix from "./components/confmat";
 
// Heading title
function Title() {
  return (
    <Box className="title">
      <h1>Fraud Model Testing</h1>
    </Box>
  );
}
 
function LabTabs() {
  const [value, setValue] = React.useState("1");
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <Box className="tabs">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Live Transactions" value="1" className="custom-tab"/>
            <Tab label="Transactional" value="2" className="custom-tab"/>
            <Tab label="Batch" value="3" className="custom-tab"/>
          </TabList>
        </Box>
 
        <TabPanel value="1">
          <div className="center-container">
            <BasicTable />
          </div>
 
          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Results</p>
            <NormalTable />
          </div>
 
          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Confusion Matrix</p>
            <ConfusionMatrix />
          </div>
        </TabPanel>
 
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
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