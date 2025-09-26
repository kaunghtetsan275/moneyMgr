"use client";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  SettingsBrightness as SystemModeIcon,
  Palette as ThemeIcon,
} from "@mui/icons-material";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    handleClose();
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <IconButton sx={{ ml: 1 }}>
        <ThemeIcon />
      </IconButton>
    );
  }

  const getCurrentIcon = () => {
    if (theme === "system") {
      return <SystemModeIcon />;
    }
    return resolvedTheme === "dark" ? <DarkModeIcon /> : <LightModeIcon />;
  };

  const getCurrentTooltip = () => {
    if (theme === "system") {
      return `System theme (${resolvedTheme === "dark" ? "Dark" : "Light"})`;
    }
    return resolvedTheme === "dark" ? "Dark theme" : "Light theme";
  };

  return (
    <>
      <Tooltip title={getCurrentTooltip()}>
        <IconButton
          onClick={handleClick}
          sx={{ ml: 1 }}
          aria-label="theme toggle"
        >
          {getCurrentIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => handleThemeChange("light")}
          selected={theme === "light"}
        >
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("dark")}
          selected={theme === "dark"}
        >
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("system")}
          selected={theme === "system"}
        >
          <ListItemIcon>
            <SystemModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle;