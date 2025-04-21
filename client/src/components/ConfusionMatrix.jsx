import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import determineColor from "../utils/determineColor";

const ConfusionMatrix = () => {

  const { dailyViewTable } = useContext(AppContext);  

  const [tp, setTp] = useState(0);
  const [fp, setFp] = useState(0);
  const [tn, setTn] = useState(0);
  const [fn, setFn] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [precision, setPrecision] = useState(0);
  const [recall, setRecall] = useState(0);
  const [f1Score, setF1Score] = useState(0);
  const [fpr, setFpr] = useState(0);
  const [fnr, setFnr] = useState(0);

  useEffect(() => {
    const totalTp = dailyViewTable.reduce((sum, item) => sum + item.tp, 0);
    const totalFp = dailyViewTable.reduce((sum, item) => sum + item.fp, 0);
    const totalTn = dailyViewTable.reduce((sum, item) => sum + item.tn, 0);
    const totalFn = dailyViewTable.reduce((sum, item) => sum + item.fn, 0);

    setTp(totalTp);
    setFp(totalFp);
    setTn(totalTn);
    setFn(totalFn);

    const accuracy = (totalTp + totalTn) / (totalTp + totalFp + totalTn + totalFn);
    const precision = totalTp / (totalTp + totalFp);
    const recall = totalTp / (totalTp + totalFn);
    const f1Score = 2 * (precision * recall) / (precision + recall);
    const fpr = totalFp / (totalFp + totalTn);
    const fnr = totalFn / (totalFn + totalTp);

    setAccuracy(accuracy)
    setPrecision(precision);
    setRecall(recall);
    setF1Score(f1Score);
    setFpr(fpr);
    setFnr(fnr);

  }, [dailyViewTable]);

  return (
    <div>
      <h3 className="side-heading">Confusion Matrix</h3>

      <div className="confmat-container">
          <div className="confmat-grid">
            <div className="confmat-empty-cell"></div>
            <div className="confmat-header-cell">Actually Fraudulent</div>
            <div className="confmat-header-cell">Actually Legitimate</div>

            <div className="confmat-header-cell">Predicted Fraudulent</div>
            <div className="confmat-cell green">
              <div><b>True Positives</b></div>
              <div>({tp})</div>
            </div>
            <div className="confmat-cell red">
              <div><b>False Positives</b></div>
              <div>({fp})</div>
            </div>

            <div className="confmat-header-cell">Predicted Legitimate</div>
            <div className="confmat-cell red">
              <div><b>False Negatives</b></div>
              <div>({fn})</div>
            </div>
            <div className="confmat-cell green">
              <div><b>True Negatives</b></div>
              <div>({tn})</div>
            </div>
          </div>

        <div className="metrics">
          <div className="metric-item">
              <span className="metric-name">Accuracy ↑</span>
              <span className={determineColor('accuracy', 100 * accuracy) + " bold"}>
                {(100 * accuracy).toFixed(2)}%
              </span>
          </div>
          <div className="metric-item">
              <span className="metric-name">Precision ↑:</span>
              <span className={determineColor('precision', 100 * precision) + " bold"}>
              {(100 * precision).toFixed(2)}%
              </span>
          </div>
          <div className="metric-item">
              <span className="metric-name bold">Recall ↑:</span>
              <span className={determineColor('recall', 100 * recall) + " bold"}>
              {(100 * recall).toFixed(2)}%
              </span>
          </div>
          <div className="metric-item">
              <span className="metric-name">F1 Score ↑:</span>
              <span className={determineColor('f1score', 100 * f1Score) + " bold"}>
              {(100 * f1Score).toFixed(2)}%
              </span>
          </div>
          <div className="metric-item">
              <span className="metric-name">FPR ↓:</span>
              <span className={determineColor('fpr', 100 * fpr) + " bold"}>
              {(100 * fpr).toFixed(2)}%
              </span>
          </div>
          <div className="metric-item">
              <span className="metric-name">FNR ↓:</span>
              <span className={determineColor('fnr', 100 * fnr) + " bold"}>
              {(100 * fnr).toFixed(2)}%
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;