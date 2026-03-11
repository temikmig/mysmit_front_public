import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface BoxRowProps {
  children: ReactNode;
  width?: number | string;
  gap?: number;
  align?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export const BoxRow: FC<BoxRowProps> = ({
  children,
  width = "100%",
  align = "start",
  gap = 2,
}) => (
  <Box
    display="flex"
    alignItems="start"
    justifyContent={align}
    gap={gap}
    width={width}
  >
    {children}
  </Box>
);
