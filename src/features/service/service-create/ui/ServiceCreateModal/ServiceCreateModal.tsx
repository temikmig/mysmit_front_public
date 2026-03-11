import { FC } from "react";

import { ServiceCreateDto, ServiceSearchOption } from "@entities/service";

import { ServiceCreateForm } from "../ServiceCreateForm";

interface ServiceCreateModalProps {
  closeModal?: () => void;
  onSuccess?: (service: ServiceSearchOption) => void;
  initial?: Partial<ServiceCreateDto>;
}

export const ServiceCreateModal: FC<ServiceCreateModalProps> = ({
  closeModal,
  onSuccess,
  initial,
}) => {
  return (
    <ServiceCreateForm
      initial={initial}
      onClose={closeModal}
      onSuccess={onSuccess}
    />
  );
};
