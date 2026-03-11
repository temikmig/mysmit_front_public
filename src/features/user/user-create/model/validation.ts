import * as yup from "yup";

import { UserRole, ROLE_CONFIG } from "@entities/user";

export const userCreateSchema = yup.object({
  firstName: yup.string().required("Введите имя"),
  lastName: yup.string().required("Введите фамилию"),
  login: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
  employeeId: yup.string().nullable().default(null),
  canViewAllServices: yup.boolean().default(false),
  canViewAllChecklists: yup.boolean().default(false),
  canViewStorage: yup.boolean().default(false),
  canViewClients: yup.boolean().default(false),
  canViewEmployees: yup.boolean().default(false),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.keys(ROLE_CONFIG) as UserRole[], "Укажите роль")
    .required("Укажите роль"),
});
