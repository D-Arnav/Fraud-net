import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ConfusionMatrix = () => {

  const { dailyViewTable } = useContext(AppContext);

  const metrics = [
    { name: "Accuracy Score ↑", value: "93.00%", color: "green" },
    { name: "Precision Score ↑", value: "0.06", color: "green" },
    { name: "Recall Score ↑", value: "0.52", color: "green" },
    { name: "F1 Score ↑", value: "0.11", color: "green" },
    { name: "FPR ↓", value: "6.65%", color: "red" },
    { name: "FNR ↓", value: "47.79%", color: "red" },
  ];

  return (
    <div>
      <h3 className="side-heading">Confusion Matrix</h3>

      <div className="confmat-container">
        {/* Confusion Matrix */}
        <div className="confmat-grid">
          <div className="confmat-empty-cell"></div>
          <div className="confmat-header-cell">Actually Positive (1)</div>
          <div className="confmat-header-cell">Actually Negative (0)</div>

          <div className="confmat-header-cell">Predicted Positive (1)</div>
          <div className="confmat-cell green">
            <div><b>True Positives</b></div>
            <div>(TPs)</div>
          </div>
          <div className="confmat-cell red">
            <div><b>False Positives</b></div>
            <div>(FPs)</div>
          </div>

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

        {/* Metrics */}
        <div className="metrics">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <span className="metric-name">{metric.name}:</span>
              <span className={`metric-value ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;