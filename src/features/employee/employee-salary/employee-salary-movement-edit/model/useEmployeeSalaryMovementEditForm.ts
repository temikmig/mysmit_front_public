import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  EmployeeSalaryMovement,
  EmployeeSalaryMovementEditDto,
} from "@entities/employee";

import { employeeSalaryMovementEditSchema } from "./validation";

export const useEmployeeSalaryMovementEditForm = (
  employeeSalaryMovement: EmployeeSalaryMovement,
) => {
  const form = useForm<EmployeeSalaryMovementEditDto>({
    mode: "onChange",
    resolver: yupResolver(employeeSalaryMovementEditSchema),
    defaultValues: {
      movementDate: new Date(employeeSalaryMovement.movementDate),
      type: employeeSalaryMovement.type,
      comment: employeeSalaryMovement.comment,
      amount: employeeSalaryMovement.amount,
      isNotChangeBalance: employeeSalaryMovement.isNotChangeBalance,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};

//useEmployeeSalaryMovement
