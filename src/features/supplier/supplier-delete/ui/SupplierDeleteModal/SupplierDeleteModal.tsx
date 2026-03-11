import { FC } from "react";

import { useSupplier } from "@entities/supplier";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteSupplier } from "../../model";

interface SupplierDeleteModalProps {
  supplierId: number;
  closeModal: () => void;
}

export const SupplierDeleteModal: FC<SupplierDeleteModalProps> = ({
  supplierId,
  closeModal,
}) => {
  const { supplier, isLoading } = useSupplier(supplierId);

  const { deleteSupplier, isLoading: isLoadingDelete } = useDeleteSupplier();

  const onSubmit = async () => {
    if (!supplier) return;

    await deleteSupplier(supplier.id);
    closeModal?.();
  };

  if (isLoading || !supplier) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить контрагента "${supplier.name}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
