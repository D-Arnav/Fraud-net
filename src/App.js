// src/App.js
import React, { useContext } from "react";
import "./App.css";
import "inter-ui/inter.css";

// Import images
import pxpLogo from "./assets/pxp-logo.png";

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
    liveSerial,
    setLiveSerial,
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
      <img src={pxpLogo} alt="PXP Logo" className="pxp-logo" />
      <h1 className="title">
        PXP Protect - AI Driven Fraud Detection Model{" "}
        <span className="ver">Model FN 1.01</span>
      </h1>
      <div className="main-container">
        <LabTabs />
      </div>
    </div>
  );
}

export default App;
