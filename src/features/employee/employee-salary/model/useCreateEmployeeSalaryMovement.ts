import {
  EmployeeNewSalary,
  EmployeeSalaryMovementCreateDto,
  useCreateEmployeeSalaryMovementMutation,
} from "@entities/employee";
import { useCreateEntity } from "@shared/lib";

export const useCreateEmployeeSalaryMovement = () => {
  const { createEntity: createEmployeeSalaryMovement, isLoading } =
    useCreateEntity<EmployeeSalaryMovementCreateDto, EmployeeNewSalary>(
      useCreateEmployeeSalaryMovementMutation,
    );

  return { createEmployeeSalaryMovement, isLoading };
};
