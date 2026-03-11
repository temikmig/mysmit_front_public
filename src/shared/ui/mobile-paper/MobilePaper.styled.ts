import { Box, Paper, styled } from "@mui/material";

export const MobilePaperStyled = styled(Paper)(() => ({
  marginTop: 58,
  borderRadius: 0,
  height: "calc(100% - 58px)",
}));

export const TitleBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  height: 80,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  ...theme.typography.h4,
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  height: "calc(100% - 80px)",
  overflow: "scroll",
}));
