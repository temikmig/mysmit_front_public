import { FC } from "react";

import { useChecklist } from "@entities/checklist";
import { formatDateToText } from "@shared/lib";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteChecklist } from "../../model";

interface ChecklistDeleteModalProps {
  checklistId: string;
  closeModal: () => void;
}

export const ChecklistDeleteModal: FC<ChecklistDeleteModalProps> = ({
  checklistId,
  closeModal,
}) => {
  const { checklist, isLoading } = useChecklist(checklistId);

  const { deleteChecklist, isLoading: isLoadingDelete } = useDeleteChecklist();

  const onSubmit = async () => {
    if (!checklist) return;

    await deleteChecklist(checklist.id);
    closeModal?.();
  };

  if (isLoading || !checklist) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить чек-лист "${checklist.service.name}" от ${formatDateToText(checklist.checklistDate, "date string")}?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
