import { Box, styled } from "@mui/material";

export const ServiceBadgeStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
}));
