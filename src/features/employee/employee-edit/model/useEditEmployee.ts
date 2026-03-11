import {
  Employee,
  EmployeeEditDto,
  useEditEmployeeMutation,
} from "@entities/employee";
import { useEditEntity } from "@shared/lib";

export const useEditEmployee = () => {
  const { editEntity: editEmployee, isLoading } = useEditEntity<
    EmployeeEditDto,
    Employee,
    string
  >(useEditEmployeeMutation);

  return { editEmployee, isLoading };
};
