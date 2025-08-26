import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";

const layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      <Box
        sx={{
          width: 240,
          bgcolor: "#fff",
          borderRight: "1px solid #e0e0e0",
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
        }}
      >
        <Navbar />
      </Box>
      <Box sx={{ flex: 1, p: 4 }}>{children}</Box>
    </Box>
  );
};

export default layout;
