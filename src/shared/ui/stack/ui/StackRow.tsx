import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";

interface StackRowProps {
  children: ReactNode;
  width?: number;
  gap?: number;
  align?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export const StackRow: FC<StackRowProps> = ({
  children,
  width,
  align = "start",
  gap = 1,
}) => (
  <Stack
    direction="row"
    justifyContent={align}
    width={width}
    spacing={gap}
    sx={{ "& > *": { flex: 1 } }}
  >
    {children}
  </Stack>
);
