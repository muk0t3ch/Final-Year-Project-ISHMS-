import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid, // Import Grid component
} from '@material-ui/core';
import QRcode from 'qrcode';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 200,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  btnCloud: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const Form = () => {
  const classes = useStyles();
  const [fullName, setFullName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [programOfStudy, setProgramOfStudy] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [imgURL, setImgURL] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fullName && studentID && programOfStudy && gender && medicalHistory && allergies) {
      try {

        const studentObject = {
          fullName: fullName,
          studentID: studentID,
          programOfStudy: programOfStudy,
          gender: gender,
          medicalHistory: medicalHistory,
          allergies: allergies,
        }

        console.log(studentObject);

        const res = await fetch(' http://localhost:2010/register', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            fullName,
            studentID,
            programOfStudy,
            gender,
            medicalHistory,
            allergies
          })
        });

        if (res.ok) {
          const imgData = await QRcode.toDataURL(studentID);
          setImgURL(imgData);
          console.log(res.json());
        }

      } catch (error) {
        console.log(error);
      }


    }
  };

  return (
    <Paper elevation={6} square>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h4" align="center">
          Student Medical Record Registration Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Student ID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Program of Study + Year"
              value={programOfStudy}
              onChange={(e) => setProgramOfStudy(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Medical History"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Generate QR Code
        </Button>
        {imgURL && (
          <div>
            <br />
            <img src={imgURL} alt="QR Code" />
            <Button
              className={classes.btnCloud}
              variant="outlined"
              color="success"
              href={imgURL}
              download={`${studentID}.png`}
            >
              Download
              <CloudDownloadIcon
                style={{ marginLeft: '10%', float: 'right' }}
                fontSize="large"
              />
            </Button>
          </div>
        )}
      </form>
    </Paper>
  );
};

export default Form;
