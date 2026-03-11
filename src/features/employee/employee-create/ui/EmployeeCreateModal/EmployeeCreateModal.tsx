import { FC } from "react";

import { EmployeeSearchOption } from "@entities/employee";

import { EmployeeCreateForm } from "../EmployeeCreateForm";

interface EmployeeCreateModalProps {
  closeModal?: () => void;
  onSuccess?: (clientSource: EmployeeSearchOption) => void;
}

export const EmployeeCreateModal: FC<EmployeeCreateModalProps> = ({
  closeModal,
  onSuccess,
}) => {
  return <EmployeeCreateForm onSuccess={onSuccess} onClose={closeModal} />;
};
