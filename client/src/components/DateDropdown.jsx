import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DateDropdown() {
  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className="date-dropdown">
        <InputLabel id="demo-simple-select-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date}
          label="Date"
          onChange={handleChange}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {`${String(i + 1).padStart(2, '0')}/01`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}