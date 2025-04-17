import { useContext } from 'react';
import './App.css';
import logo_dark from './assets/pxp_logo_dark.svg';
import logo_light from './assets/pxp_logo.svg';
import settingsIcon from './assets/settings.svg';
import Switch from './components/Switch';
import LabTabs from './components/LabTabs';
import { AppContext } from './context/AppContext';

function App() {
  const { theme, setTheme } = useContext(AppContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.style.transition = 'background 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.background =
      theme === 'dark'
        ? 'radial-gradient(circle at -30%, var(--brand-blue), transparent 60%), radial-gradient(circle at 100% , var(--brand-purple), transparent 60%), var(--black)'
        : 'radial-gradient(circle at -30%, var(--brand-blue), transparent 60%), radial-gradient(circle at 100% , var(--brand-purple), transparent 60%), var(--white)';
  };

  return (
    <div className={`pxp-page ${theme}`}>
      <header>
        <img
          src={theme === 'dark' ? logo_dark : logo_light}
          alt="pxp-logo"
          className="logo"
          key={theme}
        />
        <div className="header-controls">
          <Switch onToggle={toggleTheme} />
          <button className="settings-button">
            <img src={settingsIcon} alt="Settings" />
          </button>
        </div>
      </header>
      <div className="pxp-title">
        <h1>
          PXP Protect <span className="ver">Model Version Fn1.01</span>
        </h1>
        <p>AI Driven Fraud Detection Model</p>
      </div>
      <div className="container">
        <LabTabs />
      </div>
    </div>
  );
}

export default App;