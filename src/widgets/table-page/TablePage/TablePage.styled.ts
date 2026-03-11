import { Box, styled } from "@mui/material";

export const TablePageBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 58px)",
}));
