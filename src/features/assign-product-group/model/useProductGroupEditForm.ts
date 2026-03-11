import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ProductGroup, ProductGroupEditDto } from ".";
import { productGroupEditSchema } from "./validation";

export const useProductGroupEditForm = (productGroup: ProductGroup) => {
  const form = useForm<ProductGroupEditDto>({
    mode: "all",
    resolver: yupResolver(productGroupEditSchema),
    defaultValues: {
      name: productGroup.name,
      color: productGroup.color,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
