import { Paper, styled } from "@mui/material";

export const BoxStyled = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  margin: `0 -${theme.spacing(2)} -${theme.spacing(2)}  -${theme.spacing(2)} `,
  borderTop: `1px ${theme.palette.divider} solid`,
  width: `calc(100% + ${theme.spacing(4)})`,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
  zIndex: 999,
  position: "sticky",
  bottom: -16,
}));
