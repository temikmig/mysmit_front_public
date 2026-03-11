import { FC } from "react";

import { useClient } from "@entities/client";
import { Loader } from "@shared/ui";

import { ClientEditForm } from "../ClientEditForm";

interface ClientEditModalProps {
  clientId: string;
  closeModal?: () => void;
}

export const ClientEditModal: FC<ClientEditModalProps> = ({
  clientId,
  closeModal,
}) => {
  const { client, isLoading } = useClient(clientId);

  if (isLoading || !client) return <Loader />;

  return <ClientEditForm client={client} onClose={closeModal} />;
};
