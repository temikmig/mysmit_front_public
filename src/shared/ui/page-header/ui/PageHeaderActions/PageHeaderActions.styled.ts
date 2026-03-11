import { styled, TextField } from "@mui/material";

export const SearchField = styled(TextField)(({ theme }) => ({
  height: 40,
  borderRadius: "20px 0px 0px 20px",
  marginRight: -30,
  transition: "width 0.3s ease",

  "& input": {
    height: 40,
    padding: theme.spacing(2),
  },
  "& .MuiFilledInput-root": {
    paddingRight: 20,
    "&:before, &:after": {
      borderBottom: "none",
    },
    "&:hover:before": {
      borderBottom: "none",
    },
  },
}));
