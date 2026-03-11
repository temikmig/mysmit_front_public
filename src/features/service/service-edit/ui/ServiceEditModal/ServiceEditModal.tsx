import { FC } from "react";

import { useService } from "@entities/service";
import { Loader } from "@shared/ui";

import { ServiceEditForm } from "../ServiceEditForm";

interface ServiceEditModalProps {
  serviceId: number;
  closeModal?: () => void;
}

export const ServiceEditModal: FC<ServiceEditModalProps> = ({
  serviceId,
  closeModal,
}) => {
  const { service, isLoading } = useService(serviceId);

  if (isLoading || !service) return <Loader />;

  return <ServiceEditForm service={service} onClose={closeModal} />;
};
