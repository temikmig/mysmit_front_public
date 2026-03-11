import { FC } from "react";

import { useClientSource } from "@entities/clientSource";
import { Loader } from "@shared/ui";

import { ClientSourceEditForm } from "../ClientSourceEditForm";

interface ClientSourceEditModalProps {
  clientSourceId: string;
  closeModal?: () => void;
}

export const ClientSourceEditModal: FC<ClientSourceEditModalProps> = ({
  clientSourceId,
  closeModal,
}) => {
  const { clientSource, isLoading } = useClientSource(clientSourceId);

  if (isLoading || !clientSource) return <Loader />;

  return (
    <ClientSourceEditForm clientSource={clientSource} onClose={closeModal} />
  );
};
