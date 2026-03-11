import { FC } from "react";

import { ClientCarCreateDto, ClientCarSearchOption } from "@entities/client";

import { ClientCarCreateForm } from "../ClientCarCreateForm";

interface ClientCarCreateModalProps {
  closeModal?: () => void;
  onSuccess?: (client: ClientCarSearchOption) => void;
  initial?: Partial<ClientCarCreateDto>;
  clientId: string;
}

export const ClientCarCreateModal: FC<ClientCarCreateModalProps> = ({
  closeModal,
  onSuccess,
  initial,
  clientId,
}) => {
  return (
    <ClientCarCreateForm
      onClose={closeModal}
      onSuccess={onSuccess}
      initial={initial}
      clientId={clientId}
    />
  );
};
