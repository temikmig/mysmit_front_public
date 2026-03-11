import { Chip } from "@mui/material";
import { FC } from "react";

import {
  LOYALTY_CARD_LEVEL_COLORS,
  LOYALTY_CARD_LEVEL_LABELS,
  LoyaltyCardLevel,
} from "@entities/client";
import { getContrastColor } from "@shared/lib";

interface ClientLoyaltyBadgeProps {
  loyaltyLevel?: LoyaltyCardLevel;
}

export const ClientLoyaltyBadge: FC<ClientLoyaltyBadgeProps> = ({
  loyaltyLevel,
}) => {
  if (!loyaltyLevel) return null;

  const label = LOYALTY_CARD_LEVEL_LABELS[loyaltyLevel];
  const color = LOYALTY_CARD_LEVEL_COLORS[loyaltyLevel];

  return (
    <Chip
      label={label}
      sx={{ background: color, color: getContrastColor(color), flex: 1 }}
    />
  );
};
