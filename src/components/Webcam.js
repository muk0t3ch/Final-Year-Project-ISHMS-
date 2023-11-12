// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Divider from "@mui/material/Divider";
import { LinearProgress, createMuiTheme, Box } from "@material-ui/core";


const grey = "#f5f5f5";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1a90ff",
    },
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 4,
        height: 7,
      },
      bar1Determinate: {
        borderRadius: 4,
      },
      colorPrimary: {
        backgroundColor: grey,
      },
    },
    MuiCircularProgress: {
      circle: {
        strokeLinecap: "round",
        strokeWidth: 2.8,
      },
    },
  },
});

// eslint-disable-next-line no-unused-vars
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
      <Typography
        variant="body2"
        color="textSecondary"
      >{`${props.value}%`}</Typography>
    </Box>
  );
}

const RandomProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Randomize progress once when the component mounts
    const randomPercentage = Math.floor(Math.random() * 101);
    setProgress(randomPercentage);
  }, []);

  const getColor = () => {
    return progress <= 50 ? "red" : "green";
  };

  const getMessage = () => {
    if (progress <= 50) {
      return "The Student Can attend but can't correct medicine's";
    } else {
      return " 'The Student is eligible to correct the medicine in Campus' ";
    }
  };

  return (
    <div>
      <h1>Tuition Fee Paying Rate</h1>
      <div style={{ width: "300px", border: "0.5px solid #ccc", padding: "5px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "15px",
            backgroundColor: getColor(),
            transition: "width 1s",
          }}
        />
      </div>
      <p>{`${progress}% Complete`}</p>
      <p>{getMessage()}</p>
    </div>
  );
};

export const Webcam = () => {
  const [scanResultText, setScanResultText] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [isBreakMsg, setIsBreakMsg] = useState(
    "Visits Allowed!: (School is Not on break :This student is eligible to attend for medical at this time."
  );

  const isHospitalAvailable = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    console.log("Current month: ", currentMonth);

    if (currentMonth <= 5 || currentMonth >= 7) {
      return true; // Hospital visits allowed
      setIsBreakMsg(
        "Visits Allowed!: (School is Not on break :This student is ineligible to attend for medical at this time.)"
      );
    } else {
      return false; // Hospital visits not allowed from June to July (holiday)
      setIsBreakMsg("Not Allowed!: (School is on break)");
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      console.log(scanResultWebCam);
    }
  };

  const [studentData, setStudentData] = useState({});

  const getStudentData = async (sid) => {
    try {
      console.log("Fetching started... ", sid);

      const response = await fetch("http://localhost:2010/student-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Fullname: ", data.student.fullName);
        setStudentData(data.student);
      }
    } catch (error) {
      console.log("Error fetching student Data: ", error);
    } finally {
      setScanResultText("");
    }
  };

  let previousId = null;

  const handleResult = (result) => {
    if (result) {
      setScanResultText(result.text);
      if (previousId !== result.text) {
        console.log(result.text);
        previousId = result.text;
        isHospitalAvailable();
        getStudentData(result.text);
      }
      console.log("Same ID");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        alignContent: "center",
        marginTop: "-7%",
        display: "flex",
      }}
    >
      <div style={{ width: "50%" }}>
        <QrReader
          delay={100}
          style={{ width: "100%" }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
          onResult={handleResult}
        />
      </div>

      <>
        {scanResultText ? (
          <div
            style={{
              margin: "5%",
              border: "1px solid lightgrey",
              width: "50%",
              padding: "5%",
            }}
          >
            {isHospitalAvailable() ? (
              <Alert  severity="success">
                <Divider />
                <br/>
                <AlertTitle>
                  <Typography variant="body1" fontWeight="bold">
                    {studentData && studentData.fullName}
                  </Typography>
                </AlertTitle>

                <Divider />
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>Student ID: {scanResultText}</p>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Program of Study: {studentData && studentData.programOfStudy}
                </p>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Gender: {studentData && studentData.gender}
                </p>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  MedicalHistory: {studentData && studentData.medicalHistory}
                </p>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Allergies: {studentData && studentData.allergies}
                </p>
                <Divider />
                <br />
                <Alert variant="filled" severity="success">
                  <AlertTitle>{isBreakMsg}</AlertTitle>
                </Alert>
                <br />
                <Divider />
                <RandomProgress />
              </Alert>
            ) : (
              <Alert variant="filled" severity="success">
                This student is ineligible to attend for medical at this time.
              </Alert>
            )}
          </div>
        ) : (
          <div
            style={{
              margin: "5%",
              border: "1px solid lightgrey",
              width: "50%",
              padding: "10%",
            }}
          >
            {isHospitalAvailable() ? (
              <Typography variant="h6" gutterBottom>
                Set your Student ID Card <FeaturedVideoIcon color="success" />{" "}
                Towards the WebCam <br />
                <PhotoCameraFrontIcon color="error" fontSize="large" />
              </Typography>
            ) : (
              <Typography variant="h6" gutterBottom>
                This student is ineligible to attend for medical at this time.
              </Typography>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Webcam;
