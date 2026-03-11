import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ServiceCreateDto } from "@entities/service";

import { serviceCreateSchema } from "./validation";

export const useServiceCreateForm = (initial?: Partial<ServiceCreateDto>) => {
  const form = useForm<ServiceCreateDto>({
    mode: "all",
    resolver: yupResolver(serviceCreateSchema),
    defaultValues: {
      name: initial?.name ?? "",
      shortName: null,
      color: "#ff0000",
      salaryPercent: 40,
      postNumber: 1,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
