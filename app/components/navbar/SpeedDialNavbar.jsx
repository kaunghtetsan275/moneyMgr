"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CategoryIcon from "@mui/icons-material/Category";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useTheme } from "next-themes";

const SpeedDialNavbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getNextTheme = () => {
    if (!mounted) return "system";
    if (theme === "light") return "dark";
    if (theme === "dark") return "system";
    return "light";
  };

  const getThemeIcon = () => {
    if (!mounted) return <SettingsBrightnessIcon />;
    if (theme === "system") return <SettingsBrightnessIcon />;
    return resolvedTheme === "dark" ? <Brightness4Icon /> : <Brightness7Icon />;
  };

  const getThemeName = () => {
    if (!mounted) return "Theme";
    if (theme === "system") return "System Theme";
    return resolvedTheme === "dark" ? "Dark Theme" : "Light Theme";
  };

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
    {
      icon: getThemeIcon(),
      name: getThemeName(),
      action: () => setTheme(getNextTheme()),
      isThemeToggle: true,
    },
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
          background:
            "linear-gradient(135deg, rgb(255, 146, 78) 0%, #23272f 100%)",
          color: "#fff",
          boxShadow: 6,
          "&:hover": {
            background:
              "linear-gradient(135deg, rgb(235, 126, 58) 0%, #23272f 100%)",
          },
        },
      }}
      icon={<WidgetsIcon sx={{ color: "#fff" }} />}
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
                  : action.isThemeToggle
                  ? "#e91e63"
                  : "#ffb300",
              // bgcolor: "#23272f",
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
          sx={{ color: "#fff" }}
          onClick={() => {
            setOpen(false);
            setTimeout(() => {
              if (action.isThemeToggle) {
                action.action();
              } else {
                router.push(action.link);
              }
            }, 100);
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialNavbar;
