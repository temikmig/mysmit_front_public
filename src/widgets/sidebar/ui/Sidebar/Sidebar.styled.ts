import { styled, Typography } from "@mui/material";

export const SidebarRoot = styled("aside", {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  background: theme.palette.sidebar.main,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
  width: isOpen ? 240 : 72,
  overflowY: "auto",
  position: "relative",
  transition: "width 0.25s ease",
}));

export const VersionNum = styled(Typography)(({ theme }) => ({
  background: theme.palette.sidebar.opened,
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  fontSize: 12,
  color: theme.palette.primary.dark,
  textAlign: "right",
  whiteSpace: "nowrap",
}));
