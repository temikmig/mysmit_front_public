import { Paper, styled } from "@mui/material";

export const FormStyled = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: theme.spacing(2),
  width: "100%",
}));

export const PaperStyled = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  width: 400,
}));
