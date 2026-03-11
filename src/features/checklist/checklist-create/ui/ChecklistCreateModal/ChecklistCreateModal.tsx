import { FC } from "react";

import { ChecklistCreateForm } from "../ChecklistCreateForm";

interface ChecklistCreateModalProps {
  closeModal?: () => void;
}

export const ChecklistCreateModal: FC<ChecklistCreateModalProps> = ({
  closeModal,
}) => {
  return <ChecklistCreateForm onClose={closeModal} />;
};
