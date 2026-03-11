import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  ProductCreateDto,
  ProductUnitStoragesEnum,
  ProductUnitUsageEnum,
} from "@entities/product";

import { productCreateSchema } from "./validation";

export const useProductCreateForm = () => {
  const form = useForm<ProductCreateDto>({
    mode: "all",
    resolver: yupResolver(productCreateSchema),
    defaultValues: {
      name: "",
      shortName: null,
      article: null,
      type: undefined,
      services: [],
      unitUsage: ProductUnitUsageEnum.PIECES,
      unitStorages: ProductUnitStoragesEnum.PIECES,
      unitPack: 1,
      resourceValue: 0,
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
