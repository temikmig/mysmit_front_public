import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { SupplierCreateDto } from "@entities/supplier";

import { supplierCreateSchema } from "./validation";

export const useSupplierCreateForm = () => {
  const form = useForm<SupplierCreateDto>({
    mode: "all",
    resolver: yupResolver(supplierCreateSchema),
    defaultValues: {
      name: "",
      contactInfo: null,
      isSupplier: false,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
