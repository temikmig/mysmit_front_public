import { Typography } from "@mui/material";

import { theme } from "@shared/config";

import { PaperStyled } from "./InfoField.styled";

interface Props {
  label?: string;
  value?: React.ReactNode | string;
  variant?: "row" | "column";
  replacement?: string;
}

export const InfoField = ({
  label,
  value,
  variant = "column",
  replacement,
}: Props) => {
  if (!value) return null;
  return (
    <PaperStyled elevation={3} isRow={variant === "row"}>
      {label && (
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {label}
        </Typography>
      )}
      {typeof value === "string" ? (
        <Typography variant="body1">{value || replacement}</Typography>
      ) : (
        <>{value || <Typography variant="body1">{replacement}</Typography>}</>
      )}
    </PaperStyled>
  );
};
