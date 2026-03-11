import { Button, styled, Typography } from "@mui/material";

import { EmployeeSalaryMovementType } from "@entities/employee";

export const SalaryCount = styled(Typography)(() => ({
  height: 100,
  lineHeight: "100px",
  fontWeight: 300,
  fontSize: 56,
  textAlign: "center",
}));

type ChangeBalanceButtonProps = {
  actionType: EmployeeSalaryMovementType;
};

export const ChangeBalanceButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "actionType",
})<ChangeBalanceButtonProps>(({ theme, actionType }) => {
  const isIncrease = actionType === "INCREASE";

  return {
    display: "flex",
    flexDirection: "column",
    width: 180,
    height: 90,
    gap: theme.spacing(1),
    borderRadius: 16,

    borderWidth: 1,
    borderStyle: "solid",

    color: isIncrease ? theme.palette.success.main : theme.palette.error.main,
    borderColor: isIncrease
      ? theme.palette.success.main
      : theme.palette.error.main,

    "&:hover": {
      borderColor: isIncrease
        ? theme.palette.success.dark
        : theme.palette.error.dark,
      backgroundColor: isIncrease
        ? theme.palette.success.main + "14"
        : theme.palette.error.main + "14",
    },

    "& .MuiSvgIcon-root": {
      fontSize: 32, // большая иконка
    },
  };
});
