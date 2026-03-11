import { Box, styled } from "@mui/material";

export const PageHeaderCountBox = styled(Box)(({ theme }) => ({
  fontFamily: "inherit",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const Count = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "isAlert",
})<{ isActive: boolean; isAlert: boolean }>(({ isActive, isAlert, theme }) => ({
  ...theme.typography.body1,
  fontSize: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: isAlert
    ? theme.palette.primary.main
    : isActive
      ? theme.palette.primary.contrastText
      : theme.palette.grey[800],
  color: theme.palette.custom.black,
  width: 24,
  height: 24,
  borderRadius: "50%",
}));
