import * as yup from "yup";

export const clientCarEditSchema = yup.object({
  mark: yup.string().required("Введите марку автомобиля"),
  model: yup.string().required("Введите модель автомобиля"),
  year: yup.string().nullable().default(null),
  color: yup.string().nullable().default(null),
  number: yup.string().nullable().default(null),
});
