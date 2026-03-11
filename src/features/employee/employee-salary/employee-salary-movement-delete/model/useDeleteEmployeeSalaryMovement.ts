import { useDeleteEmployeeSalaryMovementMutation } from "@entities/employee";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteEmployeeSalaryMovement = () => {
  const { deleteEntity: deleteEmployeeSalaryMovement, isLoading } =
    useDeleteEntity<string>(useDeleteEmployeeSalaryMovementMutation);

  return { deleteEmployeeSalaryMovement, isLoading };
};
