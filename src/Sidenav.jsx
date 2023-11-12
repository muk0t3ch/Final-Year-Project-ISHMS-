import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReportIcon from '@mui/icons-material/Report';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonPinIcon from '@mui/icons-material/PersonPin';
//import StorageIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import MedicationIcon from '@mui/icons-material/Medication';
import IconButton from '@mui/material/IconButton';
import clickSound from './components/clickSound/data-reveal-sound-6460.mp3';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import logo from './components/icons/logo.png'; // Replace with the path to your logo image
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const drawerWidth = 240;

export default function Sidenav({ page }) {
  const [playSound, setPlaySound] = useState(false);

  const handleLogout = () => {
    console.log('Logout clicked');
    window.location.href = '/';
  };

  const playButtonClickSound = () => {
    setPlaySound(true);
    setTimeout(() => {
      setPlaySound(false);
    }, audioRef.current.duration * 1000);
  };

  const audioRef = React.useRef(null);

  useEffect(() => {
    if (playSound) {
      audioRef.current.play();
    }
  }, [playSound]);

  const navLinks = [
   
    {
      name: <span style={{ fontWeight: 'bold' }}>Register</span>,
      path: '/register',
      icon: <GroupAddIcon style={{ fontSize: '25px', color: '#1977D2' }} />,
      key: 3,
    },

    {
      name: <span style={{ fontWeight: 'bold' }}>HospitalPrescription</span>,
      path: '/hospitalprescription',
      icon: <MedicationIcon style={{ fontSize: '25px', color: '#1977D2' }} />,
      key: 4,
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Scan</span>,
      path: '/scan',
      icon: <PersonPinIcon style={{ fontSize: '25px', color: '#1977D2' }} />,
      key: 5,
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Alerts</span>,
      path: '/alerts', // Update with the desired path for your alerts page
      icon: <AddAlertIcon style={{ fontSize: '25px', color: '#1977D2' }} />,
      key: 6, // Make sure the key is unique
    },
    {
      name: <span style={{ fontWeight: 'bold' }}>Report</span>,
      path: '/report',
      icon: <ReportIcon style={{ fontSize: '25px', color: '#1977D2' }} />,
      key: 7,
    },
  ];

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#f0f0f0', // Set your desired color here
              },
            }}
            variant="permanent"
            anchor="left"
        >
          <Toolbar>
            <img src={logo} alt="" style={{ height: '80px', marginLeft: '40px' }} /> {/* Updated margin */}
          </Toolbar>

          <Divider />
          <List>
            {navLinks.map((item) => (
                <ListItem key={item.key} disablePadding>
                  <ListItemButton href={item.path} onClick={playButtonClickSound}>
                    {/* Add onClick to play sound */}
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton href="/about">
                <ListItemIcon>
                  <InfoIcon style={{ fontSize: '25px', color: '#1977D2' }} />
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <AppBar
  position="fixed"
  sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
>
  <Toolbar>
    <Typography
      variant="h6"
      noWrap
      component="div"
      style={{
        flexGrow: 1,
        fontSize: '25px',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
      }}
    >
      INTEGRATED STUDENT HEALTH MANAGEMENT SYSTEM (ISHMS) <QrCodeScannerIcon
        style={{ fontSize: '40px', marginLeft: '10px', color: '#ffffff' }}
      />
     
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon sx={{ marginRight: '5px' }} />
        </IconButton>
        <Typography variant="subtitle1" component="div">
          Logout
        </Typography>
      </Box>
    </Box>
  </Toolbar>
</AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <div>{page}</div>
        </Box>
        <audio ref={audioRef} src={clickSound} /> {/* Audio element */}
      </Box>
  );
}
