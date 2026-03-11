import { FC } from "react";

import { useEmployee } from "@entities/employee";
import { Loader } from "@shared/ui";

import { EmployeeEditForm } from "../EmployeeEditForm";

interface EmployeeEditModalProps {
  employeeId: string;
  closeModal?: () => void;
}

export const EmployeeEditModal: FC<EmployeeEditModalProps> = ({
  employeeId,
  closeModal,
}) => {
  const { employee, isLoading } = useEmployee(employeeId);

  if (isLoading || !employee) return <Loader />;

  return <EmployeeEditForm employee={employee} onClose={closeModal} />;
};
