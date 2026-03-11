import { Typography, Stack, StackProps } from "@mui/material";
import { FC, ReactNode } from "react";

import { FormSectionBox } from "./FormSection.styled";

interface FormSectionProps extends StackProps {
  title?: string;
  children: ReactNode;
  flex?: number | string;
}

export const FormSection: FC<FormSectionProps> = ({
  title,
  children,
  spacing = 2,
  flex,
  ...stackProps
}) => {
  return (
    <FormSectionBox sx={{ flex: flex ? 1 : undefined }}>
      {title && <Typography variant="subtitle1">{title}</Typography>}
      <Stack spacing={spacing} {...stackProps}>
        {children}
      </Stack>
    </FormSectionBox>
  );
};
