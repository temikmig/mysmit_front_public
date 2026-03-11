/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { useEmployee } from "@entities/employee";
import { useAuth } from "@features/auth";
import { Loader, MobilePaper } from "@shared/ui";

import { useLoadEmployeeSalaryMovementsList } from "../../model";
import { EmployeeSalaryBalance } from "../EmployeeSalaryBalance";
import { EmployeeSalaryMovementsList } from "../EmployeeSalaryMovementsList";

export const EmployeeSalaryScreen: FC = () => {
  const { user } = useAuth();

  const employeeId = user?.employee?.id;

  if (!employeeId) return null;

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
    <MobilePaper title="Зарплатный баланс">
      <EmployeeSalaryBalance employee={employee} reloadList={reload} />
      <EmployeeSalaryMovementsList
        movements={movements}
        hasMore={hasMore}
        containerRef={containerRef}
      />
    </MobilePaper>
  );
};
