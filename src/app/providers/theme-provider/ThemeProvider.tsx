import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { theme } from "@shared/config/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
