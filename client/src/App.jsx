import { useContext, useEffect, useState } from 'react';
import './App.css'
import logo from './assets/pxp_logo.svg';

// Import Components
import LabTabs from "./components/LabTabs";

// Import Context
import { AppContext } from './context/AppContext';

function App() {

  const { index, setIndex, transaction, setTransaction, resultsTable, setResultsTable, dailyViewTable, setDailyViewTable, selectedDate, setSelectedDate, merchant, setMerchant, theme, setTheme } = useContext(AppContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.style.background = theme === 'dark' 
      ? 'radial-gradient(circle at -30%, var(--brand-blue), transparent 60%), radial-gradient(circle at 100% -180px, var(--brand-purple), transparent 60%), var(--black)' 
      : 'radial-gradient(circle at -30%, var(--brand-blue), transparent 60%), radial-gradient(circle at 100% -180px, var(--brand-purple), transparent 60%), var(--white)';
  };
  
  return (
      <div className={`pxp-page ${theme}`}>
            <header>
            <img src={logo} alt="pxp-logo" className={`logo ${theme === 'dark' ? 'logo-dark' : 'logo-light'}`} />
            </header>
            <div className="pxp-title">
                <h1>PXP Protect <span className="ver">Model Version Fn1.01</span></h1>
                <p>AI Driven Fraud Detection Model</p>
                <button id="theme-toggle" onClick={toggleTheme}>Toggle {theme}</button>
            </div>
            <div className="container">
              <LabTabs />
            </div>
        </div>
  )
}

export default App;
