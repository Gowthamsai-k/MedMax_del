import React from "react";
import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MapIcon from "@mui/icons-material/Map";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderTop: "1px solid #ddd",
        mt: 4,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Navigation Links */}
        <Stack direction="row" spacing={3}>
          <Link href="/home" underline="none">
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
            <Typography variant="body2" color="textPrimary">Home</Typography>
          </Link>
          <Link href="/login" underline="none">
            <IconButton color="primary">
              <LoginIcon />
            </IconButton>
            <Typography variant="body2" color="textPrimary">Login</Typography>
          </Link>
          <Link href="/register" underline="none">
            <IconButton color="primary">
              <AppRegistrationIcon />
            </IconButton>
            <Typography variant="body2" color="textPrimary">Register</Typography>
          </Link>
        </Stack>

        {/* Address Info */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <MapIcon color="action" />
          <Typography variant="body2" color="textSecondary">
            123 MedMax Street, Health City, Wellness State, 999999
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
