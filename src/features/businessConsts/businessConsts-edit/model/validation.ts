import * as yup from "yup";

export const BusinessConstsEditSchema = yup.object({
  businessCosts: yup.number().required(),
  businessGrowth: yup.number().required(),
  financialReserve: yup.number().required(),
  cardAcquiring: yup.number().required(),
  qrAcquiring: yup.number().required(),
});
