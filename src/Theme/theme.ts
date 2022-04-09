import { createTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";

/**
 * @description Theme extension: https://mui.com/customization/theming/#custom-variables
 */
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
    bg: {
      main: string;
      inverse: string;
      secondary: string;
    };
    text: {
      main: string;
      inverse: string;
      accent: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    bg?: {
      main?: string;
      inverse?: string;
      secondary?: string;
    };
    text?: {
      main?: string;
      inverse?: string;
      accent?: string;
    };
  }
}

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      dark: green[800],
      main: green[400],
      light: green[300],
    },
    secondary: {
      dark: grey[500],
      main: grey[200],
      light: grey[50],
    },
  },
  bg: {
    main: "#fff",
    inverse: "#212934",
    secondary: "#e9eef5",
  },
  text: {
    main: "#212529",
    inverse: "#cfd6e1",
    accent: green[400],
  },
});
