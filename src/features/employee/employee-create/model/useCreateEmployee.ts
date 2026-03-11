import {
  EmployeeCreateDto,
  EmployeeSearchOption,
  useCreateEmployeeMutation,
} from "@entities/employee";
import { useCreateEntity } from "@shared/lib";

export const useCreateEmployee = () => {
  const { createEntity: createEmployee, isLoading } = useCreateEntity<
    EmployeeCreateDto,
    EmployeeSearchOption
  >(useCreateEmployeeMutation);

  return { createEmployee, isLoading };
};
