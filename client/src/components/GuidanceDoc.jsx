import React from 'react';
import gd from '../assets/gd.jpg';

function GuidanceDoc() {
  return (
    <div className="guidance-doc">
      <h1 className="title">Confusion Matrix</h1>
      <img src={gd} alt="Guidance Document" className="guidance-doc-image" />
      <h1 className="title">Precision and Recall: Key Metrics</h1>
      <p>
        <strong>Precision</strong> and <strong>recall</strong> are fundamental metrics for evaluating fraud detection models, each emphasizing different aspects of predictive performance:
      </p>

      <div className="section">
        <h2 className="section-title">Precision</h2>
        <ul>
          <li>Proportion of positive identifications that are correct.</li>
          <li><strong>Focus:</strong> Minimizing <span className="red">false positives</span>.</li>
        </ul>
        <p className="example">
          <strong>Example:</strong> In fraud detection, high precision ensures most flagged fraudulent transactions are indeed fraudulent, reducing unnecessary interventions.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Recall (Sensitivity)</h2>
        <ul>
          <li>Proportion of actual positives correctly identified.</li>
          <li><strong>Focus:</strong> Minimizing <span className="red">false negatives</span>.</li>
        </ul>
        <p className="example">
          <strong>Example:</strong> In medical diagnostics, high recall ensures most patients with a disease are correctly diagnosed, even if some healthy individuals are mistakenly flagged.
        </p>
      </div>

      <div className="divider" />

      <div className="section">
        <h2 className="section-title">Balancing Precision and Recall</h2>
        <p className="trade-off">
          <strong>Trade-off:</strong> Improving one often compromises the other.
        </p>
        <ul>
          <li>Higher precision in fraud detection may lower recall by overlooking some fraudulent cases.</li>
          <li>Higher recall might increase false positives, affecting precision.</li>
        </ul>
      </div>

      <div className="divider" />

      <h2 className="section-title">Example Scenarios</h2>

      <div className="section">
        <h3 className="subsection-title">1. Fraud Detection</h3>
        <p><strong>Definitions:</strong></p>
        <ul>
          <li><strong>FP (False Positive):</strong> Predicted as fraud, but is not → Value should be <span className="important">low</span>.</li>
          <li><strong>FN (False Negative):</strong> Predicted as not fraud, but is fraud → Value should be <span className="important">low</span>.</li>
          <li><strong>TP (True Positive):</strong> Predicted as fraud, and is fraud → Value should be <span className="important">high</span>.</li>
          <li><strong>TN (True Negative):</strong> Predicted as not fraud, and is not → Value should be <span className="important">high</span>.</li>
        </ul>
        <p><strong>Goal:</strong> Minimize FPs and FNs while maximizing TPs and TNs to ensure accurate fraud detection without disrupting genuine transactions.</p>
      </div>

      <div className="section">
        <h3 className="subsection-title">2. Fire Alarm System</h3>
        <p><strong>Scenario:</strong> A fire alarm system detected 10 fires in a year, but only 1 was real.</p>
        <ul>
          <li><strong>Precision:</strong> 10% (1 true positive out of 10 alarms) → Highlights many false alarms.</li>
          <li><strong>Recall:</strong> 100% (detected the 1 actual fire) → Ensures no real fires were missed.</li>
        </ul>
        <p><strong>Insight:</strong> Demonstrates the trade-off between precision and recall based on system priorities.</p>
      </div>

      <div className="divider" />

      <h2 className="section-title">Payments / PXP Use Case</h2>

      <div className="section">
        <h3 className="subsection-title">Higher Precision</h3>
        <ul>
          <li>Fewer false positives → Fewer incorrect declines.</li>
          <li>Legitimate transactions are rarely flagged as fraudulent, maintaining approval rates.</li>
          <li><strong>Trade-off:</strong> Higher chance of missing fraudulent transactions (higher false negatives).</li>
        </ul>
      </div>

      <div className="section">
        <h3 className="subsection-title">Higher Recall</h3>
        <ul>
          <li>More fraud cases caught → Higher false positives.</li>
          <li>Maximizes detection of fraudulent transactions but increases legitimate transaction declines.</li>
        </ul>
      </div>

      <div className="divider" />

      <div className="section">
        <h2 className="section-title">Fraud Detection Objective</h2>
        <ul>
          <li>Prioritizing high precision ensures flagged transactions are likely fraudulent, maintaining approval rates but potentially missing some fraud.</li>
          <li>Prioritizing high recall aims to catch all fraudulent transactions but risks increasing false positives and impacting approval rates.</li>
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">Conclusion</h2>
        <p>The balance between precision and recall should align with specific portfolio requirements, partner needs, risk tolerance, and business objectives.</p>
      </div>
    </div>
  );
}

export default GuidanceDoc;