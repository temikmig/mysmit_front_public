import { FC } from "react";

import { useChecklist } from "@entities/checklist";
import { formatDateToText } from "@shared/lib";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useApproveChecklist } from "../../model";

interface ChecklistApproveModalProps {
  checklistId: string;
  closeModal: () => void;
}

export const ChecklistApproveModal: FC<ChecklistApproveModalProps> = ({
  checklistId,
  closeModal,
}) => {
  const { checklist, isLoading } = useChecklist(checklistId);

  const { approveChecklist, isLoading: isLoadingDelete } =
    useApproveChecklist();

  const onSubmit = async () => {
    if (!checklist) return;

    await approveChecklist(checklist.id);
    closeModal?.();
  };

  if (isLoading || !checklist) return <Loader />;

  const isAwaitingSenior = checklist.status === "AWAITING_SENIOR";

  const approveText = isAwaitingSenior ? "Согласовать" : "Подтвердить";

  return (
    <MessageDialog
      description={`${approveText} чек-лист "${checklist.service.name}" от ${formatDateToText(checklist.checklistDate, "date string")}?`}
      confirmButton={{
        label: approveText,
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
