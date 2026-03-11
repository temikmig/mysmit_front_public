import { Button, styled } from "@mui/material";

import { getContrastColor } from "@shared/lib";

export const ProductGroupSelector = styled(Button, {
  shouldForwardProp: (prop) => prop !== "groupColor",
})<{ groupColor?: string }>(({ groupColor, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 16,
  backgroundColor: groupColor ?? undefined,
  color: groupColor ? getContrastColor(groupColor) : undefined,
  marginBottom: theme.spacing(3),
  transition: "0.2s",
  width: "100%",
  "&:hover": {
    backgroundColor: groupColor,
    opacity: 0.85,
  },
}));

export const ProductGroupBadge = styled(Button, {
  shouldForwardProp: (prop) => prop !== "groupColor",
})<{ groupColor: string }>(({ groupColor }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 32,
  borderRadius: 16,
  backgroundColor: groupColor,
  color: getContrastColor(groupColor),
  textTransform: "none",
  flex: 1,
  "&:hover": {
    backgroundColor: groupColor,
    opacity: 0.85,
  },
}));
