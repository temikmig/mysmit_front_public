import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ClientCarCreateDto } from "@entities/client";

import { clientCarCreateSchema } from "./validation";

export const useClientCarCreateForm = (
  clientId: string,
  initial?: Partial<ClientCarCreateDto>,
) => {
  const form = useForm<ClientCarCreateDto>({
    mode: "all",
    resolver: yupResolver(clientCarCreateSchema),
    defaultValues: {
      mark: initial?.mark || undefined,
      model: initial?.model || undefined,
      color: null,
      number: null,
      year: null,
      clientId: clientId,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
