import { Box, Typography } from "@mui/material";

import { theme } from "@shared/config";

import { PaperStyled } from "./InfoGroup.styled";

interface InfoGroupItem {
  label: string;
  value?: React.ReactNode | string;
  replacement?: string;
}

interface Props {
  items: InfoGroupItem[];
  columns?: number;
}

export const InfoGroup = ({ items }: Props) => {
  if (!items.length) return null;

  return (
    <PaperStyled elevation={3} isRow={false}>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(auto-fit, minmax(220px, 1fr))`}
        gap={2}
        width="100%"
      >
        {items.map(({ label, value, replacement }, idx) => {
          if (!value && !replacement) return null;
          return (
            <Box key={idx} display="flex" gap={1} flexDirection="column">
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {label}
              </Typography>
              {typeof value === "string" ? (
                <Typography variant="body1">{value || replacement}</Typography>
              ) : (
                <Box>
                  {value || (
                    <Typography variant="body1">{replacement}</Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </PaperStyled>
  );
};
