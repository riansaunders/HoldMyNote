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
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none",
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
