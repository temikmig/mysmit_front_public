import { TableRow, TableCell, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChecklistItemsTableContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<{
  maxHeight?: number;
}>(({ theme, maxHeight }) => ({
  borderRadius: 16,
  overflow: "auto",
  border: `1px solid ${theme.palette.divider}`,
  maxHeight: maxHeight ? maxHeight - 234 : 400,
}));

export const ChecklistItemsTableRow = styled(TableRow)(() => ({
  transition: "0.2s",
}));

export const ChecklistItemsTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: 14,
}));

export const ChecklistItemsTableTypeRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  fontWeight: 600,
  position: "sticky",
  top: 0,
  zIndex: 2,
}));
