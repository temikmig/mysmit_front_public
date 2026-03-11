import { FC } from "react";

import { useService, ServiceDetails } from "@entities/service";
import { Loader, StackColumn } from "@shared/ui";

import { ServiceCardActions } from "../ServiceCardActions";

interface ServiceCardModalProps {
  serviceId: number;
}
export const ServiceCardModal: FC<ServiceCardModalProps> = ({ serviceId }) => {
  const { service, isLoading } = useService(serviceId);

  if (isLoading) return <Loader />;

  if (!service) return;

  return (
    <StackColumn>
      <ServiceDetails service={service} />
      <ServiceCardActions service={service} />
    </StackColumn>
  );
};
