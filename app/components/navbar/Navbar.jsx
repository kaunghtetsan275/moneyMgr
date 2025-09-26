"use client";

import React from "react";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CategoryIcon from "@mui/icons-material/Category";
import ThemeToggle from "../sharedComp/ThemeToggle";
// use native anchors to force full page reloads

const Navbar = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 2,
        py: 3,
        px: 2,
        border: "1px solid #23272f",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ letterSpacing: 1, color: "text.primary", flex: 1 }}
        >
          Money Manager
        </Typography>
        <ThemeToggle />
      </Box>
      <Divider sx={{ mb: 3 }} />
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
          onClick={() => router.push("/pages/home")}
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
          onClick={() => router.push("/pages/analysis")}
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
          onClick={() => router.push("/pages/exportinfo")}
        >
          Export Data
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<CategoryIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            width: "100%",
          }}
          onClick={() => router.push("/pages/categories")}
        >
          Categories
        </Button>
      </Stack>
    </Box>
  );
};

export default Navbar;
