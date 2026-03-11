import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Employee, EmployeeEditDto } from "@entities/employee";

import { employeeEditSchema } from "./validation";

export const useEmployeeEditForm = (employee: Employee) => {
  const form = useForm<EmployeeEditDto>({
    mode: "onChange",
    resolver: yupResolver(employeeEditSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      services: employee.services.map((s) => s.id),
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
