import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward, PlayArrow, Download } from "@mui/icons-material";

// Import components
import BasicTable from "./components/BasicTable";
import NormalTable from "./components/NormalTable";
import ConfusionMatrix from "./components/confmat";

// Heading title
function Title() {
  return (
    <Box className="title">
      <h1>Fraud Detection Testing</h1>
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
            <Tab label="Live Transactions" value="1" />
            <Tab label="Transactional" value="2" />
            <Tab label="Batch" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <div className="center-container">
            <BasicTable />
          </div>

          {/* Buttons aligned to the right */}
          <Box className="button-container">
            <Button variant="contained" className="btn" startIcon={<ArrowBack />}>
              Previous
            </Button>
            <Button variant="contained" className="btn" endIcon={<ArrowForward />}>
              Next
            </Button>
            <Button variant="contained" className="btn" id="run" startIcon={<PlayArrow />}>
              Run
            </Button>
          </Box>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p><b>Results</b></p>
            <NormalTable />
          </div>

          {/* Download Button Aligned Right */}
          <Box className="button-container">
            <Button variant="contained" className="btn" startIcon={<Download />}>
              Download
            </Button>
          </Box>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p><b>Confusion Matrix</b></p>
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
