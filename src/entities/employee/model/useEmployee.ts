import { useGetEmployeeQuery, useGetEmployeeSalaryMovementQuery } from "../api";

export const useEmployee = (employeeId: string) => {
  const { data: employee, isLoading } = useGetEmployeeQuery(employeeId);

  return { employee, isLoading };
};

export const useEmployeeSalaryMovement = (employeeSalaryMovementId: string) => {
  const { data: employeeSalaryMovement, isLoading } =
    useGetEmployeeSalaryMovementQuery(employeeSalaryMovementId);

  return { employeeSalaryMovement, isLoading };
};
