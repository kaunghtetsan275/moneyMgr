import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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

export default theme;
