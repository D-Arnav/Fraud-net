import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const minDistance = 10;

export default function TwoPointSlider({ min, max, onFilter, data }) {
  const [value, setValue] = React.useState([min, max]);

  React.useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    let newValues = [...value];
    if (activeThumb === 0) {
      newValues[0] = Math.min(newValue[0], value[1] - minDistance);
    } else {
      newValues[1] = Math.max(newValue[1], value[0] + minDistance);
    }

    setValue(newValues);
  };

  React.useEffect(() => {
    if (data && onFilter) {
      const filteredData = data.filter((row) => {
        const rowDate = new Date(row.date).getTime();
        return rowDate >= value[0] && rowDate <= value[1];
      });
      onFilter(filteredData);
    }
  }, [value, data, onFilter]);

  const formatValueLabel = (val) => {
    const date = new Date(val);
    return `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${date.toLocaleString('default', { month: 'long' })}`;
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

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        className='slider'
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatValueLabel}
        min={min}
        max={max}
        disableSwap
      />
    </Box>
  );
}
