import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    header: {
      main: string;
      contrastText: string;
    };
    sidebar: {
      main: string;
      opened?: string;
      contrastText: string;
    };
    custom: {
      white: string;
      black: string;
      grey: string;
      orange: { light: string; main: string; dark: string };
      red: { light: string; main: string; dark: string };
      green: { light: string; main: string; dark: string };
      blue: { light: string; main: string; dark: string };
    };
  }

  interface PaletteOptions {
    header?: {
      main?: string;
      contrastText?: string;
    };
    sidebar?: {
      main?: string;
      opened?: string;
      contrastText?: string;
    };
    custom?: Partial<{
      white: string;
      black: string;
      grey: string;
      orange: Partial<{ light: string; main: string; dark: string }>;
      red: Partial<{ light: string; main: string; dark: string }>;
      green: Partial<{ light: string; main: string; dark: string }>;
      blue: Partial<{ light: string; main: string; dark: string }>;
    }>;
  }
}

export const palette: PaletteOptions = {
  mode: "dark",
  custom: {
    white: "#ffffff",
    black: "#000000",
    grey: "#656565",
    orange: { light: "#ffb74d", main: "#ff9800", dark: "#f57c00" },
    red: { light: "#e57373", main: "#f44336", dark: "#d32f2f" },
    green: { light: "#81c784", main: "#4caf50", dark: "#388e3c" },
    blue: { light: "#64b5f6", main: "#2196f3", dark: "#1976d2" },
  },
  primary: {
    main: "#cd1719", // RedLine основной красный
    contrastText: "#e0e0e0",
  },
  secondary: {
    main: "#b35d5e",
    contrastText: "#e0e0e0",
  },
  success: {
    main: "#028904",
    contrastText: "#e0e0e0",
  },
  error: {
    main: "#e36466",
    contrastText: "#e0e0e0",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  header: {
    main: "#3a3a3a",
    contrastText: "#e0e0e0",
  },
  sidebar: {
    main: "#1e1e1e",
    opened: "#2a2a2a",
    contrastText: "#e0e0e0",
  },
  text: {
    primary: "#e0e0e0",
    secondary: "#585858",
  },
  DataGrid: {
    bg: "#1E1E1E",
    pinnedBg: "#222222",
    headerBg: "#2A2A2A",
  },
};
