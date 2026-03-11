import { Box, styled } from "@mui/material";

export const ChecklistItem = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  transition: "0.2s",
  "&:active": {
    backgroundColor: theme.palette.grey[800],
  },
}));
