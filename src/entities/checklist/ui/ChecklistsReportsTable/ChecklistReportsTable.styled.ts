import { Paper, styled, TableCell, TableRow } from "@mui/material";

export const ChecklistReportsTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: "auto",
  border: `1px solid ${theme.palette.divider}`,
  height: "calc(100% - 58px)",
}));

export const ChecklistReportsTableRow = styled(TableRow)(({ theme }) => ({
  transition: "0.2s",
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

export const ChecklistReportsTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: 12,
}));

export const ChecklistReportsHeaderCell = styled(ChecklistReportsTableCell)(
  ({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    fontWeight: 600,
    color: theme.palette.common.white,
  }),
);

export const ChecklistReportsValueHeadCell = styled(ChecklistReportsTableCell)(
  ({ theme }) => ({
    textAlign: "right",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  }),
);

export const ChecklistReportsValueCell = styled(ChecklistReportsTableCell)(
  () => ({
    textAlign: "right",
    whiteSpace: "nowrap",
  }),
);

export const ChecklistReportsTotalValueCell = styled(ChecklistReportsTableCell)(
  ({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    textAlign: "right",
    whiteSpace: "nowrap",
  }),
);

export const ChecklistReportsHeadRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  fontWeight: 600,
  position: "sticky",
  top: 0,
  zIndex: 2,
}));

export const ChecklistReportsBottomRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  fontWeight: 600,
  position: "sticky",
  bottom: 0,
  zIndex: 2,
}));
