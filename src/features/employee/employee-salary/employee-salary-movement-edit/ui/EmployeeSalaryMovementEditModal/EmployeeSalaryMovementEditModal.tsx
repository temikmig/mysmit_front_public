import { FC } from "react";

import { useEmployeeSalaryMovement } from "@entities/employee";
import { Loader } from "@shared/ui";

import { EmployeeSalaryMovementEditForm } from "../EmployeeSalaryMovementEditForm";

interface EmployeeSalaryMovementEditModalProps {
  employeeSalaryMovementId: string;
  closeModal?: () => void;
}

export const EmployeeSalaryMovementEditModal: FC<
  EmployeeSalaryMovementEditModalProps
> = ({ employeeSalaryMovementId, closeModal }) => {
  const { employeeSalaryMovement, isLoading } = useEmployeeSalaryMovement(
    employeeSalaryMovementId,
  );

  if (isLoading || !employeeSalaryMovement) return <Loader />;

  return (
    <EmployeeSalaryMovementEditForm
      employeeSalaryMovement={employeeSalaryMovement}
      onClose={closeModal}
    />
  );
};
