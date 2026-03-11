import { Box, Stepper, styled } from "@mui/material";

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  width: "100%",

  "& .MuiStepConnector-root": {
    top: 22,
  },

  "& .MuiStepConnector-line": {
    borderTopWidth: 4,
    borderColor: theme.palette.grey[800],
  },

  "& .Mui-completed .MuiStepConnector-line": {
    borderColor: theme.palette.success.main,
  },
}));

export const StepIconWrapper = styled(Box)<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  zIndex: 2,

  backgroundColor: ownerState.completed
    ? theme.palette.success.main
    : ownerState.active
      ? theme.palette.warning.main
      : theme.palette.grey[800],
}));
