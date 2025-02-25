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
    transaction,
    setTransaction,
    matrix,
    setMatrix,
  } = useContext(AppContext);

  return (
    <div className="App">
      <h1>Fraud Model Testing</h1>
      <LabTabs />
    </div>
  );
}

export default App;
