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
  
  return (
    <>
    <p className="side-heading">Confusion Matrix</p>
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
              False Positives 
              <br />
              ({matrix[1]})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ borderRight: "2px solid black", color: "red" }}>
              False Negatives
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
    </>
  );
};

export default ConfusionMatrix;
