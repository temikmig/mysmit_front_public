import { Chip } from "@mui/material";
import { FC } from "react";

import { Service } from "@entities/service/model";
import { useOpenServiceCardModal } from "@features/service";
import { getContrastColor } from "@shared/lib";

interface ServiceBadgeProps {
  service: Service;
  openService?: boolean;
}

export const ServiceBadge: FC<ServiceBadgeProps> = ({
  service,
  openService = false,
}) => {
  const open = useOpenServiceCardModal();

  const handleOpenService = () => {
    if (!openService) return;

    open(service.id, false);
  };
  return (
    <Chip
      label={service.name}
      sx={{
        background: service.color,
        color: getContrastColor(service.color),
      }}
      onClick={handleOpenService}
    />
  );
};
