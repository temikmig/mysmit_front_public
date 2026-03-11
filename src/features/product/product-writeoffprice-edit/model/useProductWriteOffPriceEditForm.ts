import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Product, ProductWriteOffPriceEditDto } from "@entities/product";

import { productEditWriteOffPriceSchema } from "./validation";

export const useProductWriteOffPriceEditForm = (product: Product) => {
  const form = useForm<ProductWriteOffPriceEditDto>({
    mode: "all",
    resolver: yupResolver(productEditWriteOffPriceSchema),
    defaultValues: {
      historyDate: new Date(),
      writeOffPrice: product.currentWriteoffPrice,
      comment: undefined,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
