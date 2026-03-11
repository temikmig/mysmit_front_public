import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ActionsBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "flex-end",
}));
