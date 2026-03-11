import { Box, styled } from "@mui/material";

export const Trigger = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  color: theme.palette.common.white,
  transition: "0.2s",
  marginRight: theme.spacing(4),
  "&:hover": {
    background: theme.palette.grey[900],
  },
}));

export const MonthGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  width: 220,
}));

export const MonthItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "today",
})<{
  active?: boolean;
  today?: boolean;
}>(({ theme, active, today }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  fontSize: 12,
  textAlign: "center",
  cursor: "pointer",

  background: active ? theme.palette.primary.main : "transparent",

  color: active
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,

  border: today
    ? `1px solid ${theme.palette.primary.main}`
    : "1px solid transparent",

  "&:hover": {
    background: active
      ? theme.palette.primary.main
      : theme.palette.action.hover,
  },
}));
