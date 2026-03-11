import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface BoxColumnProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  gap?: number;
  align?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export const BoxColumn: FC<BoxColumnProps> = ({
  children,
  width = "100%",
  // height = "100%",
  align = "start",
  gap = 2,
}) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent={align}
    gap={gap}
    width={width}
    // height={height}
  >
    {children}
  </Box>
);
