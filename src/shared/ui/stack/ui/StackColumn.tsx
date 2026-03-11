import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";

interface StackColumnProps {
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

export const StackColumn: FC<StackColumnProps> = ({
  children,
  width,
  align = "start",
  gap = 2,
}) => (
  <Stack direction="column" justifyContent={align} spacing={gap} width={width}>
    {children}
  </Stack>
);
