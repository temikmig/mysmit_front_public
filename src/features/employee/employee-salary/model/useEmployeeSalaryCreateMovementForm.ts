import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  EmployeeSalaryMovementCreateDto,
  EmployeeSalaryMovementType,
} from "@entities/employee";

import { employeeSalaryMovementCreateSchema } from "./validation";

export const useEmployeeSalaryCreateMovementForm = (
  employeeId: string,
  type: EmployeeSalaryMovementType,
) => {
  const form = useForm<EmployeeSalaryMovementCreateDto>({
    mode: "onChange",
    resolver: yupResolver(employeeSalaryMovementCreateSchema),
    defaultValues: {
      employeeId,
      movementDate: new Date(),
      type,
      comment: undefined,
      amount: 0,
      isNotChangeBalance: false,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
