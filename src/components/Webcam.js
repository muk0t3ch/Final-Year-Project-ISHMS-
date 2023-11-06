import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import Divider from '@mui/material/Divider';
import { LinearProgress, createMuiTheme, Box } from "@material-ui/core";

const grey = "#f5f5f5";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1a90ff"
        }
    },
    overrides: {
        MuiLinearProgress: {
            root: {
                borderRadius: 4,
                height: 7
            },
            bar1Determinate: {
                borderRadius: 4
            },
            colorPrimary: {
                backgroundColor: grey
            }
        },
        MuiCircularProgress: {
            circle: {
                strokeLinecap: "round",
                strokeWidth: 2.8
            }
        }
    }
});

function NumberLinearProgress(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress
                    variant="determinate"
                    value={props.value}
                    classes={{
                        root: theme.overrides.MuiLinearProgress.root,
                        bar1Determinate: theme.overrides.MuiLinearProgress.bar1Determinate,
                        colorPrimary: theme.overrides.MuiLinearProgress.colorPrimary,
                    }}
                />
            </Box>
            <Typography variant="body2" color="textSecondary">{`${props.value}%`}</Typography>
        </Box>
    );
}

export const Webcam = () => {
    const [scanResultText, setScanResultText] = useState('');
    const [scanResultWebCam, setScanResultWebCam] = useState('');

    const [isBreakMsg, setIsBreakMsg] = useState('Visits Allowed!: (School is Not on break :This student is ineligible to attend for medical at this time.');


    const isHospitalAvailable = () => {
        // console.log('checking if day is School Break,......');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        console.log('Current month: ', currentMonth);
        // Hospital visit availability logic
        if (currentMonth <= 5 || currentMonth >= 7) {
            return true; // Hospital visits allowed 
            setIsBreakMsg('Visits Allowed!: (School is Not on break :This student is ineligible to attend for medical at this time.)');
            
        } else {
            return false; // Hospital visits not allowed from june to july (holiday)
            setIsBreakMsg('Not Allowed!: (School is on break)');
        }
    }

    const handleErrorWebCam = (error) => {
        console.log(error);
    }



    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result);
            console.log(scanResultWebCam);
        }
    }


    const [studentData, setStudentData] = useState({});

    const getStudentData = async (sid) => {

       
            try {
                console.log('Fetching started... ', sid);
    
                const response = await fetch('http://localhost:2010/student-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sid }),
                });
    
                const data = await response.json()
                if (response.ok) {
                    console.log('Fullname: ',data.student.fullName);
                    setStudentData(data.student);
                }
            } catch (error) {
                console.log('Error fetching student Data: ', error);
            } finally {
                setScanResultText('');
            }
       

        

        // setScanResultText to null after everything

    }


    // let previousScanResultText = null/; // Initialize with null

    // const [previousScanResultText, setPreviousScanResultText] = useState(null);
    let previousId = null;

    const handleResult = (result) => {
    
        if (result) {
            setScanResultText(result.text);
            if(previousId != result.text){
                console.log(result.text);
                previousId = result.text;
                isHospitalAvailable();
                getStudentData(result.text);
            }

           console.log('Same ID');
          
        }
    }

 
    return (
        <div style={{
            width: '100%',
            alignContent: 'center',
            marginTop: '-7%',
            display: 'flex'
        }}>
            <div style={{
                width: '50%'
            }}>
                <QrReader
                    delay={100}
                    style={{
                        width: '100%'
                    }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                    onResult={handleResult}
                />
            </div>

            <>
                {scanResultText ?
                    <div style={{ margin: '5%', border: '1px solid lightgray', width: '50%', padding: '5%' }}>
                        {isHospitalAvailable() ? (

                            <Alert severity="success">
                               <Divider/>
                                <AlertTitle>{studentData && studentData.fullName}</AlertTitle>
                                <Divider />
                                <p style={{ fontSize: '15px' }}>
                                    Student ID: {scanResultText}
                                </p>
                                <p style={{ fontSize: '15px' }}>
                                    Program of Study: {studentData && studentData.programOfStudy}
                                </p>
                                <p style={{ fontSize: '15px' }}>
                                    Gender: {studentData && studentData.gender}
                                </p>
                                <p style={{ fontSize: '15px' }}>
                                    MedicalHistory: {studentData && studentData.medicalHistory}
                                </p>
                                <p style={{ fontSize: '15px' }}>
                                    Allergies: {studentData && studentData.allergies}
                                </p>
                                <Divider/>
                                <Alert severity="warning"><AlertTitle>{isBreakMsg}</AlertTitle></Alert>
                            </Alert> 
                        ) : (
                            <Alert severity="error">This student is ineligible to attend for medical at this time.</Alert>
                        )}
                    </div>
                    : <div style={{ margin: '5%', border: '1px solid lightgray', width: '50%', padding: '10%' }}>
                        {isHospitalAvailable() ? (
                            <Typography variant="h6" gutterBottom> Set your Student ID Card <FeaturedVideoIcon color='success' /> <br /> Towards the WebCam <br /> <PhotoCameraFrontIcon color='error' fontSize='large' />
                            </Typography>
                        ) : (
                            <Typography variant="h6" gutterBottom> This student is ineligible to attend for medical at this time.
                            </Typography>
                        )}
                    </div>}
            </>
        </div>
    )
}

export default Webcam;
