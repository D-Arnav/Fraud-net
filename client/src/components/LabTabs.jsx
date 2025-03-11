import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";


// Import components
import LiveView from "./LiveView";
import Results from "./Results";
import DailyView from "./DailyView";
import Graphs from "./Graphs";
import ConfusionMatrix from "./ConfusionMatrix";


const LabTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="tabs">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Live Transactions" value="1" className="custom-tab" />
            <Tab label="Daily Trends" value="2" className="custom-tab" />
            <Tab label="Performance" value="3" className="custom-tab" />
            <Tab label="Models" value="4" className="custom-tab" />
            <Tab label="Guidance" value="5" className="custom-tab" />
          </TabList>
        </Box>

        <TabPanel value="1">
        <div className="center-container">
            <LiveView />
          </div>

          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <Results />
          </div>

        </TabPanel>

        <TabPanel value="2">
          <div className="center-container">
            <p>Add dropdown, progress bar, run button here</p>
            <DailyView />
          </div>
          <div>
            <Box sx={{ height: 32 }} />
            <hr className="pagebreak" />
            <ConfusionMatrix />
          </div>
        </TabPanel>

        <TabPanel value="3">
          <div>
            <Box sx={{ height: 32 }} />
            <Graphs />
          </div>
          </TabPanel>
        
        <TabPanel value="4">
          <p>1</p>
        </TabPanel>

        <TabPanel value="5">
          <p>1</p>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default LabTabs;