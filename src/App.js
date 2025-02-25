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
import {AppContext} from "./hooks/AppContext"

// Import components
import TransactionTable from "./components/TransactionTable";
import ResultsTable from "./components/ResultsTable";
import ConfusionMatrix from "./components/ConfusionMatrix";
import Graphs from "./components/Graphs";
import LabTabs from "./components/LabTabs"; // Ensure LabTabs is imported correctly

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
      <header className="App-header">
        <h1>Fraud Model Testing</h1>
      </header>
      <body>
        {/* Tabs Component */}
        <LabTabs />
      </body>
    </div>
  );
}

export default App;
