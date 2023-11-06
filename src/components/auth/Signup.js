import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";


// Import your logo file
import logoImage from "../../components/icons/logo.png";

export default function SignUpSide() {

  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log('creating Admin Account: ', formData);

    setMessage('sending Account Infomation...');

    e.preventDefault();
    if (confirmPassword == formData.password) {
      try {
        setMessage('Waiting for Server...');
        const res = await fetch(' http://localhost:2010/signup', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(formData)

        });



        if (res.ok) {
          const data = res.json();
          console.log("Admin sign up success");
          setMessage('Account Created');
          // Redirect to the '/scan' route
          window.location.href = '/scan';
        }


      } catch (error) {
        console.error("Error during registration:", error.response?.data?.error || error.message);
      }
    } else {
      console.log('passwords mast match!');
    }

  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${logoImage})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={10}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                align="center"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Admin Registration
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
              >

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {
                    message != null ? (<p>{message}</p>) : (<p>Create Account</p>)
                  }


                </Button>

                <Grid container>
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
