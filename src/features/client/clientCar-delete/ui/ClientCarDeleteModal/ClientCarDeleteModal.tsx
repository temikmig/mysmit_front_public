import { FC } from "react";

import { useClientCar } from "@entities/client";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteClientCar } from "../../model";

interface ClientCarDeleteModalProps {
  clientCarId: string;
  closeModal: () => void;
}

export const ClientCarDeleteModal: FC<ClientCarDeleteModalProps> = ({
  clientCarId,
  closeModal,
}) => {
  const { clientCar, isLoading } = useClientCar(clientCarId);

  const { deleteClientCar, isLoading: isLoadingDelete } = useDeleteClientCar();

  const onSubmit = async () => {
    if (!clientCar) return;

    await deleteClientCar(clientCar.id);
    closeModal?.();
  };

  if (isLoading || !clientCar) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить автомобиль "${clientCar.model} ${clientCar.mark}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
      // cancelButton={{ label: "Отмена", onClick: closeModal }}
    />
  );
};
