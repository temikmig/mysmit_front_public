import * as yup from "yup";

import { ClientSexEnum, LoyaltyСardLevelEnum } from "@entities/client";

export const clientEditSchema = yup.object({
  firstName: yup.string().required("Введите имя клиента"),
  lastName: yup.string().nullable().default(null),
  birthday: yup.date().typeError("Неверная дата").nullable().default(null),
  phone: yup.string().required("Укажите телефон клиента"),
  sex: yup
    .string()
    .oneOf(Object.values(ClientSexEnum))
    .nullable()
    .default(null),
  loyaltyСardNum: yup.string().nullable().default(null),
  loyaltyСardLevel: yup
    .string()
    .oneOf(Object.values(LoyaltyСardLevelEnum))
    .nullable()
    .default(null),
  clientSourceId: yup.string().nullable().default(null),
});
