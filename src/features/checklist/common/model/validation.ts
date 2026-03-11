import * as yup from "yup";

import { AcquiringTypeEnum } from "@entities/moneySource";

export const checklistSchema = yup.object({
  serviceId: yup.number().nullable().required("Выберите услугу").default(null),
  clientId: yup
    .string()
    .nullable()
    .default(null)
    .when("isManualClient", {
      is: false,
      then: (schema) => schema.required("Выберите клиента"),
      otherwise: (schema) => schema.nullable(),
    }),

  clientString: yup.string().nullable().default(null).nullable(),

  clientCarId: yup
    .string()
    .nullable()
    .default(null)
    .when("isManualClient", {
      is: false,
      then: (schema) => schema.required("Выберите автомобиль"),
      otherwise: (schema) => schema.nullable(),
    }),

  clientCarString: yup
    .string()
    .nullable()
    .default(null)
    .when("isManualClient", {
      is: true,
      then: (schema) => schema.required("Введите автомобиль"),
      otherwise: (schema) => schema.nullable(),
    }),
  isManualClient: yup.boolean().required(),
  comment: yup.string().nullable().default(null),
  itemsComment: yup.string().nullable().default(null),
  checklistDate: yup
    .date()
    .typeError("Неверная дата")
    .nullable()
    .required("Укажите дату")
    .default(null),
  price: yup.number().default(0).required("Укажите стоимость"),
  workTime: yup
    .number()
    .moreThan(0, "Значение должно быть больше 0")
    .default(0)
    .required("Укажите время"),
  moneySourceId: yup
    .string()
    .nullable()
    .required("Выберите источник финансов")
    .default(null),
  acquiringType: yup
    .string()
    .oneOf(Object.values(AcquiringTypeEnum))
    .default(AcquiringTypeEnum.NONE),
  employees: yup
    .array()
    .of(
      yup.object({
        employeeId: yup.string().required(),
        salary: yup.number().required(),
      }),
    )
    .min(1, "Укажите сотрудников")
    .required()
    .default([]),
  items: yup
    .array()
    .of(
      yup.object({
        productId: yup.number().required(),
        quantityUsed: yup.number().required(),
        writeoffPrice: yup.number().required(),
      }),
    )
    .default([]),
  businessExpenses: yup.number().default(0),
  directExpenses: yup.number().default(0),
  toolEquipment: yup.number().default(0),
  salary: yup.number().default(0),
  financialReserve: yup.number().default(0),
  businessGrowth: yup.number().default(0),
  acquiring: yup.number().default(0),
  loyalty: yup.number().default(0),
  loyaltyWriteOff: yup.number().default(0),
  acquisition: yup.number().default(0),
  allCosts: yup.number().default(0),
  profit: yup.number().default(0),
  total: yup.number().default(0),
});
