import * as yup from "yup";

export const clientSourceCreateSchema = yup.object({
  name: yup.string().required("Введите наименование источника"),
});
