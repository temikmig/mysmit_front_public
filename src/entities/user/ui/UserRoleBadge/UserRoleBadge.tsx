import { Chip } from "@mui/material";

import { ROLE_CONFIG, UserRole } from "@entities/user";

export const UserRoleBadge = ({ role }: { role: UserRole }) => {
  const config = ROLE_CONFIG[role];

  return <Chip label={config.label} color={config.color} />;
};
