import { Box, styled } from "@mui/material";

export const EmployeeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  background: theme.palette.background.paper,
}));
