import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Searchbar from './Searchbar';
import TwoPointSlider from './TwoPointSlider';
import { AppContext } from '../context/AppContext';

export default function Merchant() {
  const { setSearchQuery } = useContext(AppContext);
  const [merchantData, setMerchantData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/merchant_data');
        const data = await response.json();
        setMerchantData(data);
        setFilteredData(data);

        if (data.length > 0) {
          const dates = data.map((row) => new Date(row.date).getTime());
          const min = Math.min(...dates);
          const max = Math.max(...dates);
          setMinDate(min);
          setMaxDate(max);
        }
      } catch (error) {
        console.error('Error fetching merchant data:', error);
      }
    };

    fetchMerchantData();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredData(filtered);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day}${getOrdinalSuffix(day)} ${month}`;
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const filteredMerchant = filteredData.filter((row) =>
    row.merchant.toLowerCase().includes(setSearchQuery.toLowerCase())
  );

  return (
    <>
      <h3 className="search-title">Merchant Group</h3>
      <div className="search_section">
        <div className="searchbar-container">
          <Searchbar onSearch={setSearchQuery} />
        </div>
        <div className="slider-container">
          <span className="slider-label">{minDate ? formatDate(minDate) : ''}</span>
          {minDate && maxDate && (
            <TwoPointSlider
              className="slider"
              min={minDate}
              max={maxDate}
              data={merchantData}
              onFilter={handleFilter}
            />
          )}
          <span className="slider-label">{maxDate ? formatDate(maxDate) : ''}</span>
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
    </>
  );
}
