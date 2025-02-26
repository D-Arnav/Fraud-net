import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { AppContext } from '../hooks/AppContext';

export default function ProgressBar() {
  const [progress, setProgress] = React.useState(0);
  const { day, setDay, serial, setSerial, results, transaction, setTransaction, matrix, setMatrix } = useContext(AppContext);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress == 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '80%' }}>
      <LinearProgress variant="determinate" value={(serial + 1) * 100 / 30} sx={{ borderRadius: 5, height: 5}} />
      {/* Static value */}
    </Box>
  );
}