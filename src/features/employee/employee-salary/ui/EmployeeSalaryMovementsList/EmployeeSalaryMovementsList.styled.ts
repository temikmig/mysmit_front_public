import {
  Button,
  styled,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

export const SalaryCount = styled(Typography)(() => ({
  height: 100,
  lineHeight: "100px",
  fontWeight: 300,
  fontSize: 56,
  textAlign: "center",
}));

type ChangeBalanceButtonProps = {
  actionType: "deposit" | "withdraw";
};

export const ChangeBalanceButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "actionType",
})<ChangeBalanceButtonProps>(({ theme, actionType }) => {
  const isDeposit = actionType === "deposit";

  return {
    display: "flex",
    flexDirection: "column",
    width: 180,
    height: 90,
    gap: theme.spacing(1),
    borderRadius: 16,

    borderWidth: 1,
    borderStyle: "solid",

    color: isDeposit ? theme.palette.success.main : theme.palette.error.main,
    borderColor: isDeposit
      ? theme.palette.success.main
      : theme.palette.error.main,

    "&:hover": {
      borderColor: isDeposit
        ? theme.palette.success.dark
        : theme.palette.error.dark,
      backgroundColor: isDeposit
        ? theme.palette.success.main + "14"
        : theme.palette.error.main + "14",
    },

    "& .MuiSvgIcon-root": {
      fontSize: 32, // большая иконка
    },
  };
});

export const StyledTableContainer = styled(TableContainer)(({}) => ({
  maxHeight: 300,
}));

export const StyledTableCell = styled(TableCell)(() => ({
  verticalAlign: "top",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
