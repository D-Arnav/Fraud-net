import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { AppContext } from "../hooks/AppContext";

const ConfusionMatrix = () => {
  const { matrix } = useContext(AppContext);

  const matrixValues = {
    tp: matrix[0],
    fn: matrix[1],
    fp: matrix[2],
    tn: matrix[3],
  };

  const formatMetric = (value, threshold, flip) => {
    const percentage = (value * 100).toFixed(2);
    const color = flip ? (percentage <= threshold ? 'green' : 'red') : (percentage >= threshold ? 'green' : 'red');
    return (
      <span style={{ color, fontWeight: 'bold' }}>
        {percentage}%
      </span>
    );
  };

  const formatFRMetric = (value) => {
    const percentage = (value * 100).toFixed(2);
    const color = percentage >= 5 ? 'red' : 'green';
    return (
      <span style={{ color, fontWeight: 'bold' }}>
        {percentage}%
      </span>
    );
  };

  return (
    <>
      <p className="side-heading">Confusion Matrix</p>
      <div className="confmat-container">
        <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 400, margin: "auto" }}>
          <Table size="small" aria-label="confusion matrix" sx={{ border: "2px solid black" }}>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} sx={{ borderRight: "2px solid black", borderBottom: "2px solid black" }}></TableCell>
                <TableCell colSpan={2} align="center" sx={{ borderBottom: "2px solid black" }}><b>Predicted</b></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ borderRight: "2px solid black", borderBottom: "2px solid black" }}>
                  <b>Fraudulent</b>
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "2px solid black" }}>
                  <b>Legitimate</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={2} align="center" sx={{ borderRight: "2px solid black" }}><b>Actual</b></TableCell>
                <TableCell align="center" sx={{ borderRight: "2px solid black", borderBottom: "2px solid black", color: "green" }}>
                  True Positives
                  <br />
                  ({matrix[0]})
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "2px solid black", color: "red" }}>
                  False Negatives
                  <br />
                  ({matrix[1]})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ borderRight: "2px solid black", color: "red" }}>
                  False Positives 
                  <br />
                  ({matrix[2]})
                </TableCell>
                <TableCell align="center" sx={{ color: "green" }}>
                  True Negatives
                  <br />
                  ({matrix[3]})
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="metrics">
          <div className="metric-item">
            <span className="metric-name">Accuracy Score ↑</span>
            <span className="metric-value">{formatMetric((matrixValues.tp + matrixValues.tn) / (matrixValues.tp + matrixValues.fn + matrixValues.fp + matrixValues.tn), 90, false)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-name">Precision Score ↑</span>
            <span className="metric-value">{formatMetric(matrixValues.tp / (matrixValues.tp + matrixValues.fn), 10, false)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-name">Recall Score ↑</span>
            <span className="metric-value">{formatMetric(matrixValues.tp / (matrixValues.tp + matrixValues.fp), 25, false)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-name">F1 Score ↑</span>
            <span className="metric-value">{formatMetric((2 * matrixValues.tp) / (2 * matrixValues.tp + matrixValues.fn + matrixValues.fp), 15, false)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-name">False Positive Rate ↓</span>
            <span className="metric-value">{formatMetric(matrixValues.fp / (matrixValues.fp + matrixValues.tn), 5, true)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-name">False Negative Rate ↓</span>
            <span className="metric-value">{formatMetric(matrixValues.fn / (matrixValues.tp + matrixValues.fn), 75, true)}</span>
          </div>
        </div>
      </div>
    </>
  );
};


export default ConfusionMatrix;
