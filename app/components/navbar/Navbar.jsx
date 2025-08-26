import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 4, letterSpacing: 1, color: "#090909" }}
      >
        Money Manager
      </Typography>
      <Stack spacing={2} padding={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            width: "100%",
          }}
          component={Link}
          href="/pages/home"
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<BarChartIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            width: "100%",
          }}
          component={Link}
          href="/pages/analysis"
        >
          Analysis
        </Button>
        <Button
          variant="contained"
          color="info"
          startIcon={<FileDownloadIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            width: "100%",
          }}
          component={Link}
          href="/pages/exportinfo"
        >
          Export Data
        </Button>
      </Stack>
    </Box>
  );
};

export default Navbar;
