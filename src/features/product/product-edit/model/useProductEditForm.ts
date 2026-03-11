import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Product, ProductEditDto } from "@entities/product";

import { productEditSchema } from "./validation";

export const useProductEditForm = (product: Product) => {
  const form = useForm<ProductEditDto>({
    mode: "all",
    resolver: yupResolver(productEditSchema),
    defaultValues: {
      name: product.name,
      shortName: product.shortName,
      article: product.article,
      type: product.type,
      services: product.services.map((s) => s.id),
      unitUsage: product.unitUsage,
      unitStorages: product.unitStorages,
      unitPack: product.unitPack,
      resourceValue: product.resourceValue / product.unitPack,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
