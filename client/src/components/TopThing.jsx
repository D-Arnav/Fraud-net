import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { PlayArrowOutlined } from "@mui/icons-material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDailyViewUpdater } from '../hooks/useDailyViewUpdater';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

import fetchDates from '../services/fetchDates';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function ProgressBar({ running, timeToComplete, onComplete }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!running) {
      setProgress(0);
      return;
    }

    const intervalTime = (timeToComplete * 1000) / 100;
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          onComplete()
          return 100;
        }
        return oldProgress + 1;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [running, timeToComplete, onComplete]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} className="progressbar" />
    </Box>
  );
}

function RunButton({ onRunClick }) {
  return (
    <Button
      variant="contained"
      className="btn"
      id="run"
      endIcon={<PlayArrowOutlined />}
      disableElevation
      onClick={onRunClick}
    >
      Run
    </Button>
  );
}

function DateDropdown() {
  const { selectedDate, setSelectedDate } = useContext(AppContext);


  const [dates, setDates] = React.useState(['3/1/2025']);

  React.useEffect(() => {
    const fetchAndSetDates = async () => {
      const fetchedDates = await fetchDates();
      setDates(fetchedDates);
    };

    fetchAndSetDates();
  }, []);

  const handleDateChange = (event) => {
    const selectedIndex = event.target.value;
    const date = dates[selectedIndex - 1]
    setSelectedDate(date);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <FormControl>
          <InputLabel id="date-dropdown-label">Date</InputLabel>
          <Select
            labelId="date-dropdown-label"
            id="date-dropdown"
            className="date-dropdown"
            label="Date"
            defaultValue="1"
            onChange={handleDateChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {dates.map((date, index) => (
              <MenuItem key={index} value={index + 1}>{date}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </>
  );
}

export default function TopThing() {
  const [isRunning, setIsRunning] = React.useState(false);
  const timeToComplete = 38;
  const updateDailyView = useDailyViewUpdater();

  const handleRunClick = () => {
    setIsRunning(true);
    updateDailyView();
  };

  const handleProgressComplete = () => {
    setIsRunning(false);
  };

  return (
    <div className="top-thing">

      <DateDropdown />
      <ProgressBar running={isRunning} timeToComplete={timeToComplete} onComplete={handleProgressComplete} />
      <RunButton onRunClick={handleRunClick} />
    </div>
  );
}