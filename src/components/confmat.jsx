import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

const ConfusionMatrix = () => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 400, margin: "auto" }}>
      <Table size="small" aria-label="confusion matrix" sx={{ border: "2px solid black" }}>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} sx={{ borderRight: "2px solid black", borderBottom: "2px solid black" }}></TableCell>
            <TableCell colSpan={2} align="center" sx={{ borderBottom: "2px solid black" }}><b>Actual</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ borderRight: "2px solid black", borderBottom: "2px solid black" }}>
              <b>Positive (1)</b>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: "2px solid black" }}>
              <b>Negative (0)</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={2} align="center" sx={{ borderRight: "2px solid black" }}><b>Predicted</b></TableCell>
            <TableCell align="center" sx={{ borderRight: "2px solid black", borderBottom: "2px solid black", color: "blue" }}>
              True Positives (TPs)
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: "2px solid black", color: "blue" }}>
              False Positives (FPs)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ borderRight: "2px solid black", color: "blue" }}>
              False Negatives (FNs)
            </TableCell>
            <TableCell align="center" sx={{ color: "blue" }}>
              True Negatives (TNs)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConfusionMatrix;
