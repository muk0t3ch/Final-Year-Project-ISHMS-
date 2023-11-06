import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

const footerStyles = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
  p: 1,
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
};

export default function Footer() {
  return (
    <Box sx={footerStyles} component="footer">
  <Container maxWidth="sm">
    <Typography variant="body2" color="text.secondary" align="center" fontWeight="bold">
      {"Copyright © "}
      <Link color="inherit" href="https://www.zut.ac.zm/">
        zut.ac.zm
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Container>
</Box>

  );
}
