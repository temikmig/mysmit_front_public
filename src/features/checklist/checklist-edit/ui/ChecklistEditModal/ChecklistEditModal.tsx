import { FC } from "react";

import { useChecklist } from "@entities/checklist";
import { Loader } from "@shared/ui";

import { ChecklistEditForm } from "../ChecklistEditForm";

interface ChecklistEditModalProps {
  checklistId: string;
  closeModal?: () => void;
}

export const ChecklistEditModal: FC<ChecklistEditModalProps> = ({
  checklistId,
  closeModal,
}) => {
  const { checklist, isLoading } = useChecklist(checklistId);

  if (isLoading || !checklist) return <Loader />;

  return <ChecklistEditForm checklist={checklist} onClose={closeModal} />;
};
