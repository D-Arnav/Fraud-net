import React from 'react';

function Settings({ onClose }) {
  return (
    <div className="settings-overlay">
      <div className="settings-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Model Management</h2>
        <div className="dropdown-container">
          <select id="model-version-dropdown" className="dropdown-menu">
            <option value="FN1.01">FN1.01</option>
            <option value="FN1.02">FN1.02</option>
            <option value="FN1.03">FN1.03</option>
          </select>
          <button className="run-button">Submit</button>
        </div>
        <h2>Risk Threshold Sliders</h2>
      </div>
    </div>
  );
}

export default Settings;
