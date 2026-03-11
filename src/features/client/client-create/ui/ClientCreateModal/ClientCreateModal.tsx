import { FC } from "react";

import { ClientCreateDto, ClientSearchOption } from "@entities/client";

import { ClientCreateForm } from "../ClientCreateForm";

interface ClientCreateModalProps {
  closeModal?: () => void;
  onSuccess?: (client: ClientSearchOption) => void;
  initial?: Partial<ClientCreateDto>;
}

export const ClientCreateModal: FC<ClientCreateModalProps> = ({
  closeModal,
  onSuccess,
  initial,
}) => {
  return (
    <ClientCreateForm
      onClose={closeModal}
      onSuccess={onSuccess}
      initial={initial}
    />
  );
};
