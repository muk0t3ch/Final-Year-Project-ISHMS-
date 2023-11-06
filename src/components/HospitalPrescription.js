import React, { useRef, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import PDFIcon from '@mui/icons-material/PictureAsPdf';
import SignatureCanvas from 'react-signature-canvas';
import priescription from '../components/icons/priescription.png';
import logo from '../components/icons/logo.png';

const Footer = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>
        Copyright ©
        <a href="https://www.zut.ac.zm/" style={{ color: 'inherit', textDecoration: 'none' }}>
          zut.ac.zm
        </a>{' '}
        {new Date().getFullYear()}.
      </p>
    </div>
  );
};

const Prescription = () => {
  const patientNameRef = useRef(null);
  const ageRef = useRef(null);
  const studentIDRef = useRef(null);
  const diagnosisRef = useRef(null);
  const medicationRef = useRef(null);
  const instructionsRef = useRef(null);
  const doctorNameRef = useRef(null);
  const hospitalCardNumberRef = useRef(null);

  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const handleClear = () => {
    sign.clear();
    setUrl('');
  };

  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
  };

  const downloadPdf = () => {
    const style = `
      <style>
        h2 { text-align: center; font: 22px Times New Roman; font-weight: bold; }
        .prescription { text-align: left; font: 18px Calibri; margin-bottom: 20px; }
      </style>
    `;

    const patientName = patientNameRef.current.value;
    const age = ageRef.current.value;
    const diagnosis = diagnosisRef.current.value;
    const medication = medicationRef.current.value;
    const instructions = instructionsRef.current.value;
    const doctorName = doctorNameRef.current.value;
    const hospitalCardNumber = hospitalCardNumberRef.current.value;

    const medicationLines = medication.split('\n');
    const medicationListItems = medicationLines.map((line, index) => `<li>${index + 1}. ${line}</li>`);
    const formattedMedication = `<ul>${medicationListItems.join('')}</ul>`;

    const signatureImage = `<img src="${url}" alt="Signature" style="width: 200px; height: auto;" />`;

    const signatureLine = `
      <div style="text-align: center; margin-top: 40px;">
        <p><b>Signature:</b> ${signatureImage}</p>
      </div>
    `;

    const footerContent = `
      <div style="text-align: center; margin-top: 20px;">
        <p>
          Copyright © 
          <a href="https://www.zut.ac.zm/" style="color: inherit; text-decoration: none;">
            zut.ac.zm
          </a>
          ${new Date().getFullYear()}.
        </p>
      </div>
    `;

    const watermarkStyle = `
      <style>
        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.2;
        }
      </style>
    `;

    const watermarkImg = `<img class="watermark" src="${logo}" alt="Watermark" style="width: 650px" />`;

    const prescriptionContent = `
      <div class="prescription">
        <h2>Hospital Prescription</h2>
        ${watermarkImg}
        <p><b>Student Patient Name:</b> ${patientName}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>Doctor Name:</b> ${doctorName}</p>
        <p><b>Hospital Card Number:</b> ${hospitalCardNumber}</p>
        <p><b>Diagnosis:</b> ${diagnosis}</p>
        <p><b>Medication:</b></p>
        ${formattedMedication}
        <p><b>Instructions:</b> ${instructions}</p>
        ${signatureLine}
      </div>
      ${footerContent}
    `;

    const content = style + watermarkStyle + prescriptionContent;

    const newWin = window.open('', '', 'height=700,width=700');
    newWin.document.title = 'Medical Prescription';

    const logoImagePromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.src = priescription;
    });

    logoImagePromise.then(() => {
      newWin.document.write(content);
      newWin.document.close();

      newWin.addEventListener('load', () => {
        newWin.print();
        newWin.close();
      });
    });
  };

  const handleDownloadClick = () => {
    downloadPdf();

    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([''], { type: 'application/pdf' }));
    anchor.download = 'Medical Prescription.pdf';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <Container maxWidth="md">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src={priescription} alt="Hospital Logo" style={{ height: '100px', marginRight: '10px' }} />
        <Typography variant="h2" align="center" gutterBottom style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          Hospital Prescription
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <div style={{ width: '50%' }}>
          <Typography variant="h5"><b>Student Patient Details:</b></Typography>
          <TextField
            fullWidth
            label="Student Patient Name"
            inputRef={patientNameRef}
            placeholder="Enter student patient's name"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Age"
            inputRef={ageRef}
            placeholder="Enter student patient's age"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Doctor Name"
            inputRef={doctorNameRef}
            placeholder="Enter doctor's name"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Hospital Card Number"
            inputRef={hospitalCardNumberRef}
            placeholder="Enter hospital card number"
            margin="normal"
            variant="outlined"
          />
        </div>
      </div>
      <div>
        <Typography variant="h5"><b>Diagnosis:</b></Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          inputRef={diagnosisRef}
          margin="normal"
          variant="outlined"
        />
        <Typography variant="h5"><b>Medication:</b></Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          inputRef={medicationRef}
          margin="normal"
          variant="outlined"
        />
        <Typography variant="h5"><b>Instructions:</b></Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          inputRef={instructionsRef}
          margin="normal"
          variant="outlined"
        />

        <div style={{ border: "2px solid black", width: 500, height: 100, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
          <SignatureCanvas
            canvasProps={{ width: 500, height: 100, className: 'sigCanvas' }}
            ref={data => setSign(data)}
          />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "60px", backgroundColor: "red", color: "white", border: "none" }}
              onClick={handleClear}
            >
              Clear
            </Button>
            <div style={{ width: "10px" }}></div> {/* Add space here */}
            <Button
              variant="contained"
              color="primary"
              style={{ width: "60px", backgroundColor: "green", color: "white", border: "none" }}
              onClick={handleGenerate}
            >
              Save
            </Button>
          </div>
        </div>
        <br />
        {url && (
          <div style={{ textAlign: "center" }}>
            <img src={url} alt="Signature" style={{ width: "200px", height: "auto" }} />
          </div>
        )}


        <br></br>
        <br></br>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PDFIcon />}
            onClick={handleDownloadClick}
          >
            Generate PDF Prescription
          </Button>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

export default Prescription;
