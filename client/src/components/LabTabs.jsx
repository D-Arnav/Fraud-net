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
import TopThing from "./TopThing";
import DownloadButton from "./DownloadButton";
import GuidanceDoc from "./GuidanceDoc";
import Models from "./Models";

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
            <Tab label="Guidance" value="6" className="custom-tab" />
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
          <h3 className="side-heading">Daily View</h3>
          <TopThing />
            <DailyView />
            <div className="download-button-container">
              <DownloadButton />
            </div>
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
          <Models />
        </TabPanel>

        <TabPanel value="5">
          <GuidanceDoc />
        </TabPanel>

        <TabPanel value="6">
          <GuidanceDoc />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;