import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { User, UserEditDto } from "@entities/user";

import { userEditSchema } from "./validation";

export const useUserEditForm = (user: User) => {
  const form = useForm<UserEditDto>({
    mode: "all",
    resolver: yupResolver(userEditSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      employeeId: user.employee?.id ?? null,
      canViewAllServices: user.permissions.canViewAllServices,
      canViewAllChecklists: user.permissions.canViewAllChecklists,
      canViewStorage: user.permissions.canViewStorage,
      canViewClients: user.permissions.canViewClients,
      canViewEmployees: user.permissions.canViewEmployees,
      role: user.role,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
