import * as yup from "yup";

import { EmployeeSalaryMovementTypeEnum } from "@entities/employee";

export const employeeSalaryMovementCreateSchema = yup.object({
  employeeId: yup.string().required(),
  movementDate: yup.date().typeError("Неверная дата").nullable().default(null),
  type: yup
    .string()
    .oneOf(Object.values(EmployeeSalaryMovementTypeEnum))
    .required(),
  comment: yup.string().required("Укажите комментарий"),
  amount: yup.number().moreThan(0, "Укажите сумму").default(0),
  isNotChangeBalance: yup.boolean().default(false),
});
