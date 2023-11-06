import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinkMui from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

import logoImage from "../../components/icons/logo.png";


export default function SignInSide() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const formData = {
    email,
    password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    

    try {
      setMessage('Authenticating...');
      const res = await fetch(' http://localhost:2010/login', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          const data = res.json();
          console.log("Admin Login success");
          setMessage(data.message)
          // Redirect to the '/scan' route
          window.location.href = '/scan';
        }

    } catch (error) {
      setMessage('Login failed!');
      console.error("Error handling the form submission:", error);
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
                      t.palette.mode === "light" ? t.palette.grey[100] : t.palette.grey[1000],
                  backgroundSize: "contain",
                  backgroundPosition: "center"
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
                    alignItems: "center"
                  }}
              >
                <Typography component="h1" variant="h4" align="center" style={{ fontSize: "3rem", fontWeight: "bold", fontStyle: "italic" }}>
                  Admin Authentication
                </Typography>

                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      id="signin-btn"
                  >
                    {
                    isLoading == true ? (<p>{message}</p>) : (<p>Sign In with Email</p>)
                  }
                    
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <LinkMui
                          id="forgot-password-link"
                          component={Link}
                          to="/auth/forgotpassword"
                          variant="body2"
                      >
                        Forgot password?
                      </LinkMui>
                    </Grid>
                    <Grid item>
                      <LinkMui id="signup-link" component={Link} to="/signup" variant="body2">
                        {"Don't have an account? Create Account"}
                      </LinkMui>
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
