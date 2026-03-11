import { Chip } from "@mui/material";
import { FC } from "react";

import {
  CHECKLIST_STATUS_COLORS,
  CHECKLIST_STATUS_LABELS,
  ChecklistStatus,
} from "@entities/checklist/model";
import { getContrastColor } from "@shared/lib";

interface ChecklistStatusBadgeProps {
  status: ChecklistStatus;
  fullWidth?: boolean;
}

export const ChecklistStatusBadge: FC<ChecklistStatusBadgeProps> = ({
  status,
  fullWidth,
}) => {
  const label = CHECKLIST_STATUS_LABELS[status];
  const color = CHECKLIST_STATUS_COLORS[status];

  return (
    <Chip
      label={label}
      sx={{
        width: fullWidth ? "100%" : undefined,
        background: color,
        color: getContrastColor(color),
      }}
    />
  );
};
