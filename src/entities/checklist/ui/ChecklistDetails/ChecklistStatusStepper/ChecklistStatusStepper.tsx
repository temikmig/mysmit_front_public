import { Box, Step, StepLabel, Typography } from "@mui/material";

import { Checklist } from "@entities/checklist/model";

import { StyledStepper } from "./ChecklistStatusStepper.styled";
import { ChecklistStepIcon } from "./ChecklistStepIcon";
import { useChecklistSteps } from "./model";

interface Props {
  checklist: Checklist;
}

const statusStepMap = {
  REJECTED: 1,
  AWAITING_SENIOR: 1,
  AWAITING_MANAGER: 2,
  APPROVED: 3,
} as const;

export const ChecklistStatusStepper = ({ checklist }: Props) => {
  const steps = useChecklistSteps(checklist);
  const activeStep = statusStepMap[checklist.status] ?? 0;

  return (
    <Box width="100%">
      <StyledStepper alternativeLabel activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={(props) => (
                <ChecklistStepIcon {...props} iconComponent={step.icon} />
              )}
              optional={
                step.subLabel && (
                  <Typography variant="caption">{step.subLabel}</Typography>
                )
              }
            >
              <Typography fontWeight={600}>{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </StyledStepper>
    </Box>
  );
};
