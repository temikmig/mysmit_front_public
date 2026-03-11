import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderTab = styled(Tab)(({ theme }) => ({
  ...theme.typography.h4,
  textTransform: "none",
  color: theme.palette.grey[800],
  "&.Mui-selected": {
    color: theme.palette.primary.contrastText,
  },
}));
