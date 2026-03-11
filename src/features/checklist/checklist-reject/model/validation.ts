import * as yup from "yup";

export const checklistRejectSchema = yup.object({
  rejectedComment: yup
    .string()
    .nullable()
    .required("Введите комментарий")
    .default(null),
});
