import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { UserPasswordDto } from "@entities/user";

import { userPasswordSchema, userPasswordSchemaAdmin } from "./validation";

export const useUserPasswordForm = (isAdmin: boolean) => {
  return useForm<UserPasswordDto>({
    resolver: yupResolver(
      isAdmin ? userPasswordSchemaAdmin : userPasswordSchema,
    ),
  });
};
