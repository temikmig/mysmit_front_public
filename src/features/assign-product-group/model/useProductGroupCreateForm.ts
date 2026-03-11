import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ProductGroupCreateDto } from ".";
import { productGroupCreateSchema } from "./validation";

export const useProductGroupCreateForm = (serviceId: number) => {
  const form = useForm<ProductGroupCreateDto>({
    mode: "all",
    resolver: yupResolver(productGroupCreateSchema),
    defaultValues: {
      name: "",
      serviceId: serviceId,
      color: "#8e7b31",
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
