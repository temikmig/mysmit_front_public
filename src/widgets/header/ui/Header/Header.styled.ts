import { styled, Box, IconButton } from "@mui/material";

export const HeaderRoot = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: 58,
  padding: `0 ${theme.spacing(3)} 0 ${theme.spacing(2)}`,
  background: theme.palette.header.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: `0px 0px 10px 0px ${theme.palette.primary.main}`,
  zIndex: 19,
}));

export const HeaderButton = styled(IconButton)(() => ({
  "& svg": { fontSize: 24 },
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));
