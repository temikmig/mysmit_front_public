import * as yup from "yup";

export const serviceEditSchema = yup.object({
  name: yup.string().required("Введите наименование услуги"),
  shortName: yup.string().nullable().default(null),
  color: yup.string().required("Укажите цвет"),
  salaryPercent: yup
    .number()
    .nullable()
    .required("Укажите процент на зарплату")
    .min(0, "Процент не может быть отрицательным")
    .max(100, "Процент не может превышать 100"),
  postNumber: yup
    .number()
    .nullable()
    .required("Укажите количество постов")
    .min(1, "Минимум 1 пост")
    .integer("Должно быть целое число"),
});
