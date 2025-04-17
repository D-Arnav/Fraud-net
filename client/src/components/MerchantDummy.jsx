import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Searchbar from './Searchbar';
import Slider from './Slider';

// Temporary mock AppContext for debugging
const MockAppContext = React.createContext();

const dummyData = [
  { merchant: 'Merchant A', num_legitimate: 120, num_fraudulent: 5, precision: 0.96, recall: 0.92, false_negative_rate: 0.08, false_positive_rate: 0.04 },
  { merchant: 'Merchant B', num_legitimate: 80, num_fraudulent: 20, precision: 0.80, recall: 0.75, false_negative_rate: 0.25, false_positive_rate: 0.20 },
  { merchant: 'Merchant C', num_legitimate: 150, num_fraudulent: 10, precision: 0.94, recall: 0.90, false_negative_rate: 0.10, false_positive_rate: 0.06 },
  { merchant: 'Merchant D', num_legitimate: 50, num_fraudulent: 30, precision: 0.62, recall: 0.60, false_negative_rate: 0.40, false_positive_rate: 0.38 },
];

export default function MerchantDummy() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredMerchant = dummyData.filter((row) =>
    row.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MockAppContext.Provider value={{ filteredMerchant, setSearchQuery }}>
      <h3 className="search-title">Merchant Group</h3>
      <div className="search_section">
        <div className="searchbar-container">
          <Searchbar onSearch={setSearchQuery} />
        </div>
        <div className="slider-container">
          <span className="slider-label">15-10</span>
          <Slider />
          <span className="slider-label">24-10</span>
        </div>
      </div>
      <TableContainer component={Paper} elevation={0} className="table-container" sx={{ width: '100% !important' }}>
        <Table className="dailyview-table" size="small" aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell align="center"><b>Merchant</b></TableCell>
              <TableCell align="center"><b># Legit</b></TableCell>
              <TableCell align="center"><b># Fraud</b></TableCell>
              <TableCell align="center"><b>Precision</b></TableCell>
              <TableCell align="center"><b>Recall</b></TableCell>
              <TableCell align="center"><b>FNR %</b></TableCell>
              <TableCell align="center"><b>FPR %</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMerchant.map((row, index) => (
              <TableRow key={index} className="table-row">
                <TableCell align="center">{row.merchant}</TableCell>
                <TableCell align="center">{row.num_legitimate}</TableCell>
                <TableCell align="center">{row.num_fraudulent}</TableCell>
                <TableCell align="center">{(100 * row.precision).toFixed(2)}%</TableCell>
                <TableCell align="center">{(100 * row.recall).toFixed(2)}%</TableCell>
                <TableCell align="center">{(row.false_negative_rate * 100).toFixed(2)}%</TableCell>
                <TableCell align="center">{(row.false_positive_rate * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MockAppContext.Provider>
  );
}
