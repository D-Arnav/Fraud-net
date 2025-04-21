import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useLiveViewUpdater } from '../hooks/useLiveViewUpdater';
import { AppContext } from '../context/AppContext';

const LiveView = () => {

  const { transaction } = useContext(AppContext);

  useLiveViewUpdater();

  return (
    <div className="liveview-container">
      <h3 className="side-heading">Live View</h3>
      <TableContainer component={Paper} elevation={0} className="table-container">
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow className="table-row">
              <TableCell className="label-cell">Serial</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Serial']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Date</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Date']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Payment ID</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Payment ID']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Name</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Name']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Card Hash</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Card Hash']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Card BIN</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Card BIN']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Amount</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Amount']}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="label-cell">Currency</TableCell>
              <TableCell className="value-cell" align="right">{transaction['Currency']}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LiveView;
