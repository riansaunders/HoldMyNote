import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  spacing: 10,
  typography: {
    fontFamily: `Montserrat, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none",
        height: '70px',
      },
    },
    MuiButton: {
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },

    MuiTypography: {
      body1: {
        fontSize: "14px",
      },
    },
  },
});

export default theme;
