"use client";
import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import SpeedDialNavbar from "../components/navbar/SpeedDialNavbar";
import QueryProvider from "./QueryProvider";
import { useMediaQuery, useTheme } from "@mui/material";

const layout = ({ children }) => {
  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));
  const isAboveTablet = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      {isAboveTablet && (
        <Box
          sx={{
            width: 240,
            bgcolor: "background.paper",
            borderRight: "1px solid #23272f",
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
          }}
        >
          <Navbar />
        </Box>
      )}

      {isTabletOrBelow && (
        <Box
          sx={{
            position: "fixed",
            left: 16,
            bottom: 24,
            zIndex: 1500,
          }}
        >
          <SpeedDialNavbar />
        </Box>
      )}
      <Box sx={{ flex: 1, p: 4 }}>
        <QueryProvider>{children}</QueryProvider>
      </Box>
    </Box>
  );
};

export default layout;
