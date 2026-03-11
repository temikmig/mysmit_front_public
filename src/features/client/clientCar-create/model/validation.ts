import * as yup from "yup";

export const clientCarCreateSchema = yup.object({
  mark: yup.string().required("Введите марку автомобиля").default(null),
  model: yup.string().required("Введите модель автомобиля").default(null),
  year: yup.string().nullable().default(null),
  color: yup.string().nullable().default(null),
  number: yup.string().nullable().default(null),
  clientId: yup.string().required(),
});
