import * as yup from "yup";

export const passwordSchema = yup
  .string()
  .required("Введите пароль")
  .min(8, "Пароль должен быть не меньше 8 символов")
  .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
  .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
  .matches(/\d/, "Пароль должен содержать хотя бы одну цифру");
// .matches(
//   /[!@#$%^&*]/,
//   "Пароль должен содержать хотя бы один спецсимвол (!@#$%^&*)",
// );

export const userPasswordSchema = yup.object({
  currentPassword: yup.string().required("Введите текущий пароль"),
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

export const userPasswordSchemaAdmin = yup.object({
  newPassword: yup.string().required(),
});
