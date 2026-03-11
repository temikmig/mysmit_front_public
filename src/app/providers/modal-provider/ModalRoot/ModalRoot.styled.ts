import { Dialog, DialogTitle, Box, styled } from "@mui/material";

export const DialogStyled = styled(Dialog)<{ fullScreen?: boolean }>(
  ({ theme, fullScreen }) => ({
    "&.MuiDialog-paper": {
      borderRadius: fullScreen ? 0 : theme.shape.borderRadius,
    },
  }),
);

export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "0.2s",
  "&:hover": {
    background: theme.palette.grey[800],
  },
}));

export const DialogTitleButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));
