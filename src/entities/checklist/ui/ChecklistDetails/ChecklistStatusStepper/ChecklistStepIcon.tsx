import { StepIconProps } from "@mui/material";

import { StepIconWrapper } from "./ChecklistStatusStepper.styled";

interface ChecklistStepIconProps extends StepIconProps {
  iconComponent: React.ReactNode;
}

export const ChecklistStepIcon = ({
  active,
  completed,
  iconComponent,
}: ChecklistStepIconProps) => {
  return (
    <StepIconWrapper ownerState={{ active, completed }}>
      {iconComponent}
    </StepIconWrapper>
  );
};
