import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import Webcam from './Webcam';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [scannedData, setScannedData] = React.useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleScan = (data) => {
    setScannedData(data);
    console.log('From Scanned: ', data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any additional actions with the scanned data, like submitting it to a server
    console.log('Scanned data:', scannedData);
    // Reset the form if needed
    setScannedData('');
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '' }}>
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Start Scan Students Medical Record</h1>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <ListItemIcon>
                <QrCodeScannerOutlinedIcon fontSize='large' />
              </ListItemIcon>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              QR Code
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Webcam onScan={handleScan} />
          </AccordionDetails>
        </Accordion>
        {scannedData && (
          <div>
            <form onSubmit={handleSubmit}>
              {/* Render your form fields here */}
              <p>Scanned Data: {scannedData}</p>
              <button type="submit">Submit</button>
            </form>
            {/* Progress bars displayed when there is scanned data */}
            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
              <FacebookCircularProgress />
              <br />
              <BorderLinearProgress variant="determinate" value={50} />
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
