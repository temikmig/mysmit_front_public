import {
  EmployeeSalaryMovementEditDto,
  EmployeeNewSalary,
  useEditEmployeeSalaryMovementMutation,
} from "@entities/employee";
import { useEditEntity } from "@shared/lib";

export const useEditEmployeeSalaryMovement = () => {
  const { editEntity: editEmployeeSalaryMovement, isLoading } = useEditEntity<
    EmployeeSalaryMovementEditDto,
    EmployeeNewSalary,
    string
  >(useEditEmployeeSalaryMovementMutation);

  return { editEmployeeSalaryMovement, isLoading };
};
