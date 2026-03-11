import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ColorBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body1,
  height: 48,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "0.2s",
  width: "100%",
  "&:hover": {
    opacity: 0.8,
  },
}));
