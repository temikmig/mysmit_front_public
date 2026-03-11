import { FC } from "react";

import { Service } from "@entities/service/model";
import { getContrastColor } from "@shared/lib";

import { ServiceIconStyled } from "./ServiceIcon.styled";

interface ServiceIconProps {
  service: Service;
  size?: number;
}

export const ServiceIcon: FC<ServiceIconProps> = ({ service, size = 48 }) => {
  const letter = `${service.name?.[0] ?? ""}`.toUpperCase();

  return (
    <ServiceIconStyled
      sx={{
        background: service.color,
        color: getContrastColor(service.color),
        width: size,
        height: size,
      }}
    >
      {letter}
    </ServiceIconStyled>
  );
};
