import * as yup from "yup";

import { EmployeeSalaryMovementTypeEnum } from "@entities/employee";

export const employeeSalaryMovementEditSchema = yup.object({
  movementDate: yup.date().typeError("Неверная дата").nullable().default(null),
  type: yup
    .string()
    .oneOf(Object.values(EmployeeSalaryMovementTypeEnum))
    .required(),
  comment: yup.string().required("Укажите комментарий"),
  amount: yup.number().moreThan(0, "Укажите сумму").default(0),
  isNotChangeBalance: yup.boolean().default(false),
});
