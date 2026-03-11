import * as yup from "yup";

export const employeeCreateSchema = yup.object({
  firstName: yup.string().required("Введите имя сотрудника"),
  lastName: yup.string().required("Введите фамилию сотрудника"),
  phone: yup.string().nullable().default(null),
  services: yup.array().of(yup.number().required()).default([]),
});
