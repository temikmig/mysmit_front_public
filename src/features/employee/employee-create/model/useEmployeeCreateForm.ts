import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { EmployeeCreateDto } from "@entities/employee";

import { employeeCreateSchema } from "./validation";

export const useEmployeeSourceCreateForm = () => {
  const form = useForm<EmployeeCreateDto>({
    mode: "all",
    resolver: yupResolver(employeeCreateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: null,
      services: [],
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
