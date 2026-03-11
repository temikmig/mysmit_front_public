import { Button, Box, styled } from "@mui/material";

export const MenuCont = styled(Box)(({ theme }) => ({
  background: theme.palette.sidebar.opened,
  margin: `-${theme.spacing(2)}`,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  zIndex: 9,
  top: `-${theme.spacing(2)}`,
  gap: theme.spacing(2),
}));

export const MenuButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSub",
})<{ isSub: boolean }>(({ theme, isSub }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "start",
  gap: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  paddingLeft: isSub ? theme.spacing(3) : undefined,
  width: "100%",
  color: theme.palette.text.primary,
  overflow: "hidden",
  whiteSpace: "nowrap",
  minWidth: 0,
  minHeight: 40,

  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1),
    marginLeft: 0,
    "& svg": {
      fontSize: 24,
    },
  },
}));
