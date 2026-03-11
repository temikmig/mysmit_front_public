import { FC } from "react";

import { useClientSource } from "@entities/clientSource";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteClientSource } from "../../model";

interface ClientSourceDeleteModalProps {
  clientSourceId: string;
  closeModal: () => void;
}

export const ClientSourceDeleteModal: FC<ClientSourceDeleteModalProps> = ({
  clientSourceId,
  closeModal,
}) => {
  const { clientSource, isLoading } = useClientSource(clientSourceId);

  const { deleteClientSource, isLoading: isLoadingDelete } =
    useDeleteClientSource();

  const onSubmit = async () => {
    if (!clientSource) return;

    await deleteClientSource(clientSource.id);
    closeModal?.();
  };

  if (isLoading || !clientSource) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить источник клиента "${clientSource.name}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
