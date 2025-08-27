"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeIcon from "@mui/icons-material/Home";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import BarChartIcon from "@mui/icons-material/BarChart";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CategoryIcon from "@mui/icons-material/Category";

const SpeedDialNavbar = () => {
  const actions = [
    { icon: <HomeIcon />, name: "Home", link: "/pages/home" },
    {
      icon: <CategoryIcon />,
      name: "Categories",
      link: "/pages/categories",
    },
    {
      icon: <FileDownloadIcon />,
      name: "Export Data",
      link: "/pages/exportinfo",
    },
    { icon: <BarChartIcon />, name: "Analysis", link: "/pages/analysis" },
  ];

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial
      ariaLabel="SpeedDial navigation"
      sx={{
        position: "static",
        m: 0,
        zIndex: 1500,
        ".MuiSpeedDial-fab": {
          background: "linear-gradient(135deg, #ef5350 0%, #23272f 100%)",
          color: "#fff",
          boxShadow: 6,
          "&:hover": {
            background: "linear-gradient(135deg, #b71c1c 0%, #23272f 100%)",
          },
        },
      }}
      icon={<SpeedDialIcon sx={{ color: "#fff" }} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {actions.map((action, idx) => (
        <SpeedDialAction
          key={action.name}
          icon={React.cloneElement(action.icon, {
            sx: {
              color:
                action.name === "Home"
                  ? "#43a047"
                  : action.name === "Export Data"
                  ? "#29b6f6"
                  : "#ffb300",
              bgcolor: "#23272f",
              borderRadius: 2,
              fontSize: 28,
              p: 0.5,
            },
          })}
          tooltipPlacement="right"
          slotProps={{
            tooltip: {
              open: true,
              title: (
                <span style={{ whiteSpace: "nowrap" }}>{action.name}</span>
              ),
              sx: { whiteSpace: "nowrap" },
            },
          }}
          sx={{ color: "#fff", "&:hover": { bgcolor: "#1e1e1e" } }}
          onClick={() => {
            setOpen(false);
            setTimeout(() => {
              router.push(action.link);
            }, 100);
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialNavbar;
