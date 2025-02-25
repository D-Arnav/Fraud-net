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

function LabTabs() {
  const [value, setValue] = React.useState("1");
  const { serial, setSerial, results, setResults } = useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="tabs">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Transactional" value="1" className="custom-tab" />
            <Tab label="Batch" value="2" className="custom-tab" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <div className="center-container">
            <TransactionTable
              serial={serial}
              setSerial={setSerial}
              results={results}
              setResults={setResults}
            />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Results</p>
            <ResultsTable results={results} serial={serial} />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Confusion Matrix</p>
            <ConfusionMatrix />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Graph</p>
            <Graphs />
          </div>
        </TabPanel>

        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
}

export default LabTabs;
