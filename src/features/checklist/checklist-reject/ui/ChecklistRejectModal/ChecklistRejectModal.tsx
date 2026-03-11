import { FC } from "react";

import { useChecklist } from "@entities/checklist";
import { Loader } from "@shared/ui";

import { ChecklistRejectForm } from "../ChecklistRejectForm";

interface ChecklistRejectModalProps {
  checklistId: string;
  closeModal?: () => void;
}

export const ChecklistRejectModal: FC<ChecklistRejectModalProps> = ({
  checklistId,
  closeModal,
}) => {
  const { checklist, isLoading } = useChecklist(checklistId);

  if (isLoading || !checklist) return <Loader />;

  return <ChecklistRejectForm checklist={checklist} onClose={closeModal} />;
};
