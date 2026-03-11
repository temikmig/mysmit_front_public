import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Supplier, SupplierEditDto } from "@entities/supplier";

import { supplierEditSchema } from "./validation";

export const useSupplierEditForm = (supplier: Supplier) => {
  const form = useForm<SupplierEditDto>({
    mode: "onChange",
    resolver: yupResolver(supplierEditSchema),
    defaultValues: {
      name: supplier.name,
      contactInfo: supplier.contactInfo,
      isSupplier: supplier.isSupplier,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
