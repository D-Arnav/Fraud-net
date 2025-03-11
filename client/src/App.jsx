import React, { useState, useEffect } from 'react';
import logo from './assets/pxp_logo.svg';

function App() {
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
            </div>
        </div>
        </>
  );
}

export default App;