import React from "react";

const ConfusionMatrix = () => {
  return (
    <div className="confusionmatrix-container">
      <h3 className="side-heading">Confusion Matrix</h3>
    <div className="confmat-container">
      <div className="confmat-grid">
        
        {/* Empty Top-left Cell */}
        <div className="confmat-empty-cell"></div>

        {/* Top Header Cells */}
        <div className="confmat-header-cell">Actually Positive (1)</div>
        <div className="confmat-header-cell">Actually Negative (0)</div>

        {/* Predicted Positive Row */}
        <div className="confmat-header-cell">Predicted Positive (1)</div>
        <div className="confmat-cell green">
          <div><b>True Positives</b></div>
          <div>(TPs)</div>
        </div>
        <div className="confmat-cell red">
          <div><b>False Positives</b></div>
          <div>(FPs)</div>
        </div>

        {/* Predicted Negative Row */}
        <div className="confmat-header-cell">Predicted Negative (0)</div>
        <div className="confmat-cell red">
          <div><b>False Negatives</b></div>
          <div>(FNs)</div>
        </div>
        <div className="confmat-cell green">
          <div><b>True Negatives</b></div>
          <div>(TNs)</div>
        </div>

      </div>
    </div>
    </div>
  );
};

export default ConfusionMatrix;
