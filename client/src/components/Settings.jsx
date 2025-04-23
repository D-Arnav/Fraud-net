import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import adminSliderInputs from '../services/adminSliderInputs.jsx';
import adminPTRInputs from '../services/adminPTRInputs.jsx';

function Settings({ onClose }) {
  // State variables for sliders and inputs
  const [lowRiskValue, setLowRiskValue] = useState(50);
  const [mediumRiskValue, setMediumRiskValue] = useState(60);
  const [highRiskValue, setHighRiskValue] = useState(70);
  const [veryHighRiskValue, setVeryHighRiskValue] = useState(30);
  const [passThroughRatio, setPassThroughRatio] = useState(40);
  const [retrainDays, setRetrainDays] = useState(7);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleRetrainDaysChange = (e) => {
    const value = Math.max(1, Math.min(30, Number(e.target.value)));
    setRetrainDays(value);
  };

  return (
    <div className="settings-overlay">
      <div className="settings-content">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Model Management Section */}
        <section className="model-management-section">
          <h2 className="settings-title">Model Management</h2>
          <div className="dropdown-container">
            <select id="model-version-dropdown" className="dropdown-menu">
              <option value="FN1.01">FN1.01</option>
              <option value="FN1.02">FN1.02</option>
              <option value="FN1.03">FN1.03</option>
            </select>
            <button className="run-button">Submit</button>
          </div>
        </section>

        {/* Risk Threshold Sliders Section */}
        <section className="risk-threshold-section">
          <h2 className="settings-title">Risk Threshold Sliders</h2>
          <div className="sliders-container">
            <div className="slider-container">
              <span className="slider-label">Low Risk</span>
              <Slider
                className="slider"
                value={lowRiskValue}
                onChange={(e, newValue) => setLowRiskValue(newValue)}
                min={0}
                max={100}
                valueLabelDisplay="off"
              />
              <span className="slider-value">{lowRiskValue}%</span>
            </div>
            <div className="slider-container">
              <span className="slider-label">Medium Risk</span>
              <Slider
                className="slider"
                value={mediumRiskValue}
                onChange={(e, newValue) => setMediumRiskValue(newValue)}
                min={0}
                max={100}
                valueLabelDisplay="off"
              />
              <span className="slider-value">{mediumRiskValue}%</span>
            </div>
            <div className="slider-container">
              <span className="slider-label">High Risk</span>
              <Slider
                className="slider"
                value={highRiskValue}
                onChange={(e, newValue) => setHighRiskValue(newValue)}
                min={0}
                max={100}
                valueLabelDisplay="off"
              />
              <span className="slider-value">{highRiskValue}%</span>
            </div>
            <div className="slider-container">
              <span className="slider-label">Very High Risk</span>
              <Slider
                className="slider"
                value={veryHighRiskValue}
                onChange={(e, newValue) => setVeryHighRiskValue(newValue)}
                min={0}
                max={100}
                valueLabelDisplay="off"
              />
              <span className="slider-value">{veryHighRiskValue}%</span>
            </div>
          </div>
          <div className="save-button-container">
            <button
              className="save-button"
              onClick={() => {
                console.log(adminSliderInputs(lowRiskValue, mediumRiskValue, highRiskValue, veryHighRiskValue));
              }}
            >
              Save
            </button>
          </div>
        </section>

        {/* Pass-through Ratio Section */}
        <section className="pass-through-section">
          <h2 className="settings-title">Pass-through Ratio</h2>
          <div className="slider-container">
            <Slider
              className="slider pass-through-slider"
              value={passThroughRatio}
              onChange={(e, newValue) => setPassThroughRatio(newValue)}
              min={0}
              max={100}
              valueLabelDisplay="off"
            />
            <span className="slider-value">{passThroughRatio}%</span>
          </div>
          <div className="save-button-container">
            <button
              className="save-button"
              onClick={() => {
                console.log(adminPTRInputs(passThroughRatio));
              }}
            >
              Save
            </button>
          </div>
        </section>

        {/* Model Retraining Configuration Section */}
        <section className="retrain-section">
          <h2 className="settings-title">Model Retraining Configuration</h2>
          <div className="retrain-container">
            <label htmlFor="retrain-days" className="retrain-label">
              Retrain every
            </label>
            <input
              id="retrain-days"
              type="number"
              className="retrain-input"
              value={retrainDays}
              onChange={handleRetrainDaysChange}
              min={1}
              max={30}
            />
            <span className="retrain-text">days</span>
          </div>


        </section>
      </div>
    </div>
  );
}

export default Settings;