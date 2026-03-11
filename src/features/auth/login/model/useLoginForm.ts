import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { LoginDto } from "./types";
import { loginSchema } from "./validation";

export const useLoginForm = () => {
  return useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onSubmit",
  });
};
