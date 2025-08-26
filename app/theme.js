import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Modern blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#43a047", // Modern green
      contrastText: "#fff",
    },
    background: {
      default: "#f5f6fa", // Soft background
      paper: "#fff",
    },
    text: {
      primary: "#222b45",
      secondary: "#6b778c",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    fontWeightBold: 700,
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
