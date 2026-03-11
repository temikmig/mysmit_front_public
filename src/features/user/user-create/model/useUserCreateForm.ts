import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { UserCreateDto, UserRoleEnum } from "@entities/user";

import { userCreateSchema } from "./validation";

export const useUserCreateForm = () => {
  const form = useForm<UserCreateDto>({
    mode: "all",
    resolver: yupResolver(userCreateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      login: "",
      employeeId: null,
      canViewAllServices: false,
      canViewAllChecklists: false,
      canViewStorage: false,
      canViewClients: false,
      canViewEmployees: false,
      password: "",
      role: UserRoleEnum.WORKER,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
