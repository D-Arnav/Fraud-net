import "./App.css";
import "inter-ui/inter.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Import components
import BasicTable from "./components/BasicTable";
import NormalTable from "./components/NormalTable";
import ConfusionMatrix from "./components/confmat";
import Graphs from "./components/Graphs";

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
            <Tab label="Batch" value="2" className="custom-tab" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <div className="center-container">
            <BasicTable serial={serial} setSerial={setSerial} results={results} setResults={setResults} />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <p className="side-heading">Results</p>
            <NormalTable results={results} serial={serial} />
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

function App() {
  return (
    <div>
      <Title />
      <LabTabs />
    </div>
  );
}

export default App;
