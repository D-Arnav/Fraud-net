import React, { useContext } from 'react';
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
            {Object.entries(transaction).map(([key, value]) => {
                let formattedKey = key
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, char => char.toUpperCase())
                  .replace('Id', 'ID')
                  .replace('Bin', 'BIN');

              return (
                <TableRow key={key} className="table-row">
                  <TableCell className="label-cell">{formattedKey}</TableCell>
                  <TableCell className="value-cell" align="right">{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LiveView;