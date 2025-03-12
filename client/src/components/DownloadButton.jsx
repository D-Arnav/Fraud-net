import * as React from 'react';
import Button from '@mui/material/Button';
import { Download } from "@mui/icons-material";

export default function DownloadButton() {
  return (
    <Button variant="contained" className="btn" id="download" endIcon={<Download />} disableElevation>
      Download
    </Button>
  );
}