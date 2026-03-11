import * as yup from "yup";

export const clientSourceEditSchema = yup.object({
  name: yup.string().required("Введите наименование источника клиента"),
});
