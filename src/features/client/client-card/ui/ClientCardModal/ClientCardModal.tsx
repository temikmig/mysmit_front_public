import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { ClientDetails, useClient } from "@entities/client";
import { useAuth } from "@features/auth";
import { Loader, StackColumn } from "@shared/ui";

import { ClientCardActions } from "../ClientCardActions";

interface ClientCardModalProps {
  clientId: string;
}
export const ClientCardModal: FC<ClientCardModalProps> = ({ clientId }) => {
  const { isAdmin } = useAuth();
  const { client, isLoading } = useClient(clientId);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!isLoading && !client) {
      closeModal();
    }
  }, [isLoading, client, closeModal]);

  if (isLoading) return <Loader />;
  if (!client) return null;

  return (
    <StackColumn>
      <ClientDetails client={client} />
      {isAdmin && <ClientCardActions client={client} />}
    </StackColumn>
  );
};
