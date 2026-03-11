import { Box, styled } from "@mui/material";

export const FormSectionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  // flex: 1,
  // "&:not(:last-of-type)": {
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(2),
  // },
}));
