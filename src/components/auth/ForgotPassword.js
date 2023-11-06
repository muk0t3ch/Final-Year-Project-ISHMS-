import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import resetpassword from "../../components/icons/resetpassword.png";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setResetSuccessful] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make a POST request to the server to handle the password reset request
      const response = await axios.post("/api/resetpassword", { email });
      console.log(response.data);

      // Show success message or redirect the user to another page
      // (You can customize this according to your specific use case)
      alert("Password reset link sent successfully!");
      setResetSuccessful(true);

      // Automatically refresh the page after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error during password reset request:", error);

      // Show error message or handle the error accordingly
      setError("Error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the link click and initiate the page refresh
  const handleBackToLogin = () => {
    history.push("/"); // Navigate to the login page
    window.location.reload(); // Reload the page
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Paper elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="auth-header">
              <div className="auth-header-logo forgot-img">
                <img
                  src={resetpassword}
                  alt=""
                  className="auth-header-logo-img"
                  style={{ width: "50px" }}
                />
              </div>
            </div>

            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              Forgot Password?
            </Typography>
            <Typography
              variant="subtitle1"
              className="auth-header-subtitle forgot-subtitle"
            >
              Enter your email and we'll send you instructions to reset your
              password
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              className="auth-form-validation"
              onSubmit={handleFormSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="btn-submit"
                disabled={loading} // Disable the button while the request is being processed
              >
                {loading ? "Sending..." : "Send Link Notification"}
              </Button>
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Link
                to="/"
                variant="body2"
                onClick={handleBackToLogin} // Handle the link click
              >
                Back to login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPassword;
