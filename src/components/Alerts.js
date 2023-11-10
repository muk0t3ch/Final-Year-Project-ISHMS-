import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import CircularProgress from '@material-ui/core/CircularProgress';


function EmailForm() {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (file) {
            sendEmail();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const sendEmail = async () => {
        if (file === null) {
            setMessage('Please attach a file before sending an email.');
            return;
        }

        const formData = new FormData();
        formData.append('to', 'givenmukwanje@yahoo.com');
        formData.append('subject', 'Student Hospital Alert Visit Notification!');
        formData.append('text', text);
        formData.append('file', file);

        formData.append('html',`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                    <style>
                        /* Inline CSS for email compatibility */
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .jumbotron {
                            background-color: #f8f9fa;
                            padding: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="text-center text-primary">Student Hospital Alert Visit Notification !</h1>
                        <div class="jumbotron">
                            <p><strong>Subject:</strong> Notification of Student Hospital Visit Clinic.</p>
                            <p class="mb-0"><strong>Student Name:</strong> `+ text +`</p>
                            <p class="mb-0"><strong>Visit Date:</strong> `+ Date() +`</p>
                            <p class="mb-0"><strong>Reason for Visit:</strong> The student's primary reason for visiting the medical facility is due to feeling unwell and being sick.</p>
                            <p class="mt-4"><strong>Message:</strong></p>
                            <p>This is to inform you that the student, by the Name of : `+ text +` visited hospital for a medical examination, and we have attached a prescription for medication because this student is ill.. .</p>
                        </div>
                    </div>
                </body>
                </html>
`);

        setMessage('Sending Email: Loading.............' );

        try {
            const response = await fetch('http://localhost:2010/sendEmail', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage(
                    <>
                        Email Sent Successfully <CheckCircleIcon fontSize="normal" style={{ color: 'green' }} />
                    </>
                );
            }
        } catch (error) {
            console.log('Error:', error);
            setMessage('Error sending email.');
        }
    };

    return (
        <Paper elevation={6} square style={{ padding: '15px' }}>
            <div>
                <Typography variant="h4" align="center">
                    Email Alert Notification |
                    <EmailIcon style={{ marginLeft: '5px' }} />
                </Typography>
                <div style={{ margin: '5px 0' }}>
                    <TextField
                        label="Student Name & Visit Hospital Name"
                        variant="outlined"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ margin: '5px 0', width: '100%' }}>
                        <Button
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            onClick={() => document.getElementById('file-input').click()}
                            style={{
                                backgroundColor: '#1977D2',
                                color: 'white',
                                padding: '10px 5px',
                                borderRadius: '5px',
                                margin: '10px 0',
                            }}
                        >
                            Upload Prescription
                        </Button>
                        <input
                            type="file"
                            id="file-input"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // This input is hidden using CSS
                        />
                    </div>
                </div>
            </div>
            {message && <Typography style={{ marginTop: '10px' }}>{message}</Typography>}
        </Paper>
    );
}

export default EmailForm;
