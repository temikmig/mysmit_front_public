import * as yup from "yup";

import {
  ProductTypeEnum,
  ProductUnitStoragesEnum,
  ProductUnitUsageEnum,
} from "@entities/product";

export const productCreateSchema = yup.object({
  name: yup.string().required("Укажите наименование товара"),
  shortName: yup.string().nullable().default(null),
  article: yup.string().nullable().default(null),
  type: yup
    .string()
    .nullable()
    .oneOf(Object.values(ProductTypeEnum))
    .required("Укажите тип товара")
    .default(null),
  services: yup.array().of(yup.number().required()).default([]),
  unitUsage: yup
    .string()
    .oneOf(Object.values(ProductUnitUsageEnum))
    .default(ProductUnitUsageEnum.PIECES),
  unitStorages: yup
    .string()
    .oneOf(Object.values(ProductUnitStoragesEnum))
    .default(ProductUnitStoragesEnum.PIECES),
  unitPack: yup.number().default(1).required(),
  resourceValue: yup
    .number()
    .moreThan(0, "Значение должно быть больше 0")
    .default(0)
    .required("Укажите значение ресурса"),
});
