import { Paper, styled } from "@mui/material";

export const PaperStyled = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isRow",
})<{ isRow: boolean }>(({ theme, isRow }) => ({
  width: "100%",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: isRow ? "row-reverse" : "column",
  alignItems: isRow ? "center" : "flex-start",
  justifyContent: isRow ? "space-between" : "flex-start",

  gap: theme.spacing(0.5),
}));
