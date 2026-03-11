import { TableRow, TableCell, TableContainer } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
}));

export const StyledRow = styled(TableRow)(({ theme }) => ({
  transition: "0.2s",

  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const StyledCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: 14,
}));

export const StyledValueCell = styled(StyledCell)(() => ({
  textAlign: "right",
  fontWeight: 500,
}));

export const TotalRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],

  "& td": {
    fontWeight: 700,
    fontSize: 15,
  },
}));
