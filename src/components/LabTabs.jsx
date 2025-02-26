import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Import Hooks
import { AppContext } from "../hooks/AppContext";

// Import components
import TransactionTable from "./TransactionTable";
import ResultsTable from "./ResultsTable";
import ConfusionMatrix from "./ConfusionMatrix";
import Graphs from "./Graphs";

const LabTabs = () => {
  const [value, setValue] = React.useState("1");
  const [serial, setSerial] = React.useState(0);
  const [results, setResults] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="tabs">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Transactional" value="1" className="custom-tab" />
            <Tab label="Graphs" value="2" className="custom-tab" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <div className="center-container">
            <TransactionTable />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Results</p>
            <ResultsTable />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Confusion Matrix</p>
            <ConfusionMatrix />
          </div>
        </TabPanel>

        <TabPanel value="2">
          <div>
            <Box sx={{ height: 32 }} />
            <Graphs />
          </div>
          </TabPanel>
      </TabContext>
    </Box>
  );
}

export default LabTabs;
