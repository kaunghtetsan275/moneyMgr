import { createTheme } from "@mui/material/styles";

// Light theme configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e", // Pink accent
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#bdbdbd",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    fontWeightBold: 700,
    h4: {
      fontWeight: 700,
      color: "#212121",
    },
    h5: {
      fontWeight: 700,
      color: "#212121",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
          color: "#fff",
          border: 0,
          boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.15)",
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
        },
        containedSecondary: {
          background: "linear-gradient(90deg, #dc004e 0%, #0288d1 100%)",
        },
        containedSuccess: {
          background: "linear-gradient(90deg, #2e7d32 0%, #43a047 100%)",
        },
        containedError: {
          background: "linear-gradient(90deg, #d32f2f 0%, #dc004e 100%)",
        },
        containedInfo: {
          background: "linear-gradient(90deg, #0288d1 0%, #1976d2 100%)",
        },
      },
    },
  },
  shape: {
    borderRadius: 14,
  },
});

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue
      contrastText: "#0d1117",
    },
    secondary: {
      main: "#f48fb1", // Pink accent
      contrastText: "#0d1117",
    },
    success: {
      main: "#66bb6a",
      contrastText: "#0d1117",
    },
    error: {
      main: "#ef5350",
      contrastText: "#0d1117",
    },
    info: {
      main: "#29b6f6",
      contrastText: "#0d1117",
    },
    background: {
      default: "#121212", // true dark
      paper: "#1e1e1e", // slightly lighter for cards
    },
    text: {
      primary: "#f5f6fa", // bright for dark bg
      secondary: "#b0b8c1", // muted but visible
      disabled: "#6b778c", // for disabled text
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    fontWeightBold: 700,
    h4: {
      fontWeight: 700,
      color: "#e3eafc",
    },
    h5: {
      fontWeight: 700,
      color: "#e3eafc",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
          color: "#fff",
          border: 0,
          boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.15)",
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
        },
        containedSecondary: {
          background: "linear-gradient(90deg, #f48fb1 0%, #29b6f6 100%)",
        },
        containedSuccess: {
          background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
        },
        containedError: {
          background: "linear-gradient(90deg, #ef5350 0%, #f48fb1 100%)",
        },
        containedInfo: {
          background: "linear-gradient(90deg, #29b6f6 0%, #90caf9 100%)",
        },
      },
    },
  },
  shape: {
    borderRadius: 14,
  },
});

// Function to get theme based on mode
export const getTheme = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

export default darkTheme;
