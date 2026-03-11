import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { EmployeeDetails, useEmployee } from "@entities/employee";
import { useAuth } from "@features/auth";
import { EmployeeCardActions } from "@features/employee";
import { Loader, StackColumn } from "@shared/ui";

interface EmployeeCardModalProps {
  employeeId: string;
}
export const EmployeeCardModal: FC<EmployeeCardModalProps> = ({
  employeeId,
}) => {
  const { isAdmin } = useAuth();

  const { employee, isLoading } = useEmployee(employeeId);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!isLoading && !employee) {
      closeModal();
    }
  }, [isLoading, employee, closeModal]);

  if (isLoading) return <Loader />;
  if (!employee) return null;

  return (
    <StackColumn>
      <EmployeeDetails employee={employee} />
      {isAdmin && <EmployeeCardActions employee={employee} />}
    </StackColumn>
  );
};
