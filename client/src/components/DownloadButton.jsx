import * as React from 'react';
import Button from '@mui/material/Button';
import { Download } from "@mui/icons-material";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import downloadTable from '../utils/downloadTable';

export default function DownloadButton() {
  const { dailyViewTable } = useContext(AppContext);

  const handleDownload = () => {
    downloadTable(dailyViewTable, 'daily_view_table');
  };

  return (
    <Button 
      variant="contained" 
      className="btn" 
      id="download" 
      endIcon={<Download />} 
      disableElevation
      onClick={handleDownload}
    >
      Download
    </Button>
  );
}