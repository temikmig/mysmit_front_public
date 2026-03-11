import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { useEmployee } from "@entities/employee";
import { BoxColumn, Loader } from "@shared/ui";

import { useLoadEmployeeSalaryMovementsList } from "../../model";
import { EmployeeSalaryBalance } from "../EmployeeSalaryBalance";
import { EmployeeSalaryMovementsList } from "../EmployeeSalaryMovementsList";

interface EmployeeSalaryModalProps {
  employeeId: string;
}
export const EmployeeSalaryModal: FC<EmployeeSalaryModalProps> = ({
  employeeId,
}) => {
  const { employee, isLoading } = useEmployee(employeeId);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!isLoading && !employee) {
      closeModal();
    }
  }, [isLoading, employee, closeModal]);

  const { movements, hasMore, containerRef, reload } =
    useLoadEmployeeSalaryMovementsList(employeeId);

  if (isLoading) return <Loader />;
  if (!employee) return null;

  return (
    <BoxColumn>
      <EmployeeSalaryBalance employee={employee} reloadList={reload} />
      <EmployeeSalaryMovementsList
        movements={movements}
        hasMore={hasMore}
        containerRef={containerRef}
      />
    </BoxColumn>
  );
};
