"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { getTheme } from "../theme";

export default function MuiThemeProvider({ children }) {
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use system theme as fallback during SSR to prevent hydration mismatch
  const themeMode = mounted ? theme : 'system';
  const muiTheme = getTheme(themeMode);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
