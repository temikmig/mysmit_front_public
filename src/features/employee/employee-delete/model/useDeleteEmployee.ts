import { useDeleteEmployeeMutation } from "@entities/employee";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteEmployee = () => {
  const { deleteEntity: deleteEmployee, isLoading } = useDeleteEntity<string>(
    useDeleteEmployeeMutation,
  );

  return { deleteEmployee, isLoading };
};
