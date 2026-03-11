import * as yup from "yup";

export const productGroupCreateSchema = yup.object({
  name: yup.string().required("Введите наименование группы"),
  serviceId: yup.number().required(),
  color: yup.string().required("Укажите цвет"),
});

export const productGroupEditSchema = yup.object({
  name: yup.string().required("Введите наименование группы"),
  color: yup.string().required("Укажите цвет"),
});
