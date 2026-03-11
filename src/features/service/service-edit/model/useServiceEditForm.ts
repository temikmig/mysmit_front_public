import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Service, ServiceEditDto } from "@entities/service";

import { serviceEditSchema } from "./validation";

export const useServiceEditForm = (service: Service) => {
  const form = useForm<ServiceEditDto>({
    mode: "all",
    resolver: yupResolver(serviceEditSchema),
    defaultValues: {
      name: service.name,
      shortName: service.shortName,
      color: service.color,
      salaryPercent: service.salaryPercent * 100,
      postNumber: service.postNumber,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
