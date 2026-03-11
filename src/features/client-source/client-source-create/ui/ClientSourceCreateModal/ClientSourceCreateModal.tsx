import { FC } from "react";

import { ClientSourceSearchOption } from "@entities/clientSource";

import { ClientSourceCreateForm } from "../ClientSourceCreateForm";

interface ClientSourceCreateModalProps {
  closeModal?: () => void;
  onSuccess?: (clientSource: ClientSourceSearchOption) => void;
}

export const ClientSourceCreateModal: FC<ClientSourceCreateModalProps> = ({
  closeModal,
  onSuccess,
}) => {
  return <ClientSourceCreateForm onClose={closeModal} onSuccess={onSuccess} />;
};
