import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ClientSourceCreateDto } from "@entities/clientSource";

import { clientSourceCreateSchema } from "./validation";

export const useClientSourceCreateForm = () => {
  const form = useForm<ClientSourceCreateDto>({
    mode: "all",
    resolver: yupResolver(clientSourceCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
