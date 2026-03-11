import { FC } from "react";

import { useClient } from "@entities/client";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteClient } from "../../model";

interface ClientDeleteModalProps {
  clientId: string;
  closeModal: () => void;
}

export const ClientDeleteModal: FC<ClientDeleteModalProps> = ({
  clientId,
  closeModal,
}) => {
  const { client, isLoading } = useClient(clientId);

  const { deleteClient, isLoading: isLoadingDelete } = useDeleteClient();

  const onSubmit = async () => {
    if (!client) return;

    await deleteClient(client.id);
    closeModal?.();
  };

  if (isLoading || !client) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить клиента "${client.firstName} ${client.lastName}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
      // cancelButton={{ label: "Отмена", onClick: closeModal }}
    />
  );
};
