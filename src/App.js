// src/App.js
import React, { useContext } from "react";
import "./App.css";
import "inter-ui/inter.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

//Import Hooks
import { AppContext } from "./hooks/AppContext";

//Import Components
import LabTabs from "./components/LabTabs";

function App() {
  const {
    day,
    setDay,
    serial,
    setSerial,
    results,
    setResults,
    status,
    setStatus,
    transaction,
    setTransaction,
    matrix,
    setMatrix,
    metrics,
    setMetrics,
  } = useContext(AppContext);

  return (
    <div className="App">
      <h1 className="title">Fraud Model Testing <span className="ver">FN 1.01</span></h1>
      <LabTabs />
    </div>
  );
}

export default App;
