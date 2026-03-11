import * as yup from "yup";

export const supplierEditSchema = yup.object({
  name: yup.string().required("Введите наименование контрагента"),
  contactInfo: yup.string().nullable().default(null),
  isSupplier: yup.boolean().default(false),
});
