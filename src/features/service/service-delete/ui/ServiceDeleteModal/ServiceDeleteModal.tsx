import { FC } from "react";

import { useService } from "@entities/service";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteService } from "../../model";

interface ServiceDeleteModalProps {
  serviceId: number;
  closeModal: () => void;
}

export const ServiceDeleteModal: FC<ServiceDeleteModalProps> = ({
  serviceId,
  closeModal,
}) => {
  const { service, isLoading } = useService(serviceId);

  const { deleteService, isLoading: isLoadingDelete } = useDeleteService();

  const onSubmit = async () => {
    if (!service) return;

    await deleteService(service.id);
    closeModal?.();
  };

  if (isLoading || !service) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить услугу "${service.name}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
