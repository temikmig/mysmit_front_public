import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ClientSource, ClientSourceEditDto } from "@entities/clientSource";

import { clientSourceEditSchema } from "./validation";

export const useClientSourceEditForm = (clientSource: ClientSource) => {
  const form = useForm<ClientSourceEditDto>({
    mode: "all",
    resolver: yupResolver(clientSourceEditSchema),
    defaultValues: {
      name: clientSource.name,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
