import { useContext } from 'react';
import './App.css'
import logo from './assets/pxp_logo.svg';

// Import Components
import LabTabs from "./components/LabTabs";

// Import Context
import { AppContext } from './context/AppContext';


function App() {

  const { index, setIndex, transaction, setTransaction, resultsTable, setResultsTable } = useContext(AppContext);
  
  return (
    <>
      <div className="pxp-page">
            <header>
            <img src={logo} alt="pxp-logo" className="logo" />
            </header>
            <div className="title">
                <h1>PXP Protect <span className="ver">Model Version Fn1.01</span></h1>
                <p>AI Driven Fraud Detection Model</p>
            </div>
            <div className="container">
              <LabTabs />
            </div>
        </div>
    </>
  )
}

export default App;
