import { ThemeOptions, Theme } from "@mui/material";

export const getTypography = (theme: Theme): ThemeOptions["typography"] => ({
  fontFamily: "Inter, sans-serif",
  h1: {
    fontSize: 36,
    fontWeight: 300,
    color: theme.palette.text.primary,
  },
  h2: {
    fontSize: 32,
    fontWeight: 300,
    color: theme.palette.text.primary,
  },
  h3: {
    fontSize: 28,
    fontWeight: 300,
    color: theme.palette.text.primary,
  },
  h4: {
    fontSize: 24,
    fontWeight: 300,
    color: theme.palette.text.primary,
  },
  h5: {
    fontSize: 20,
    fontWeight: 300,
    color: theme.palette.text.primary,
  },
  h6: {
    fontSize: 16,
    fontWeight: 300,
    color: theme.palette.text.primary,
  },
  body1: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  body2: {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
});
