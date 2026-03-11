import { Box, styled } from "@mui/material";

export const NotificationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: `1px ${theme.palette.divider} solid`,
  "&:last-child": {
    border: "none",
  },
  width: 350,
  "&:hover": {
    background: theme.palette.grey[800],
  },
}));
