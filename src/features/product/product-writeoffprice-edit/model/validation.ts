import * as yup from "yup";

export const productEditWriteOffPriceSchema = yup.object({
  historyDate: yup
    .date()
    .typeError("Неверная дата")
    .default(() => new Date()),
  writeOffPrice: yup.number().required().default(0),
  comment: yup
    .string()
    .nullable()
    .required("Укажите комментарий")
    .default(null),
});
