import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  BusinessConsts,
  BusinessConstsCreateDto,
} from "@entities/businessConsts";

import { BusinessConstsEditSchema } from "./validation";

export const useBusinessConstsEditForm = (businessConsts: BusinessConsts) => {
  const form = useForm<BusinessConstsCreateDto>({
    mode: "all",
    resolver: yupResolver(BusinessConstsEditSchema),
    defaultValues: {
      businessCosts: businessConsts.businessCosts,
      businessGrowth: Number((businessConsts.businessGrowth * 100).toFixed(2)),
      financialReserve: Number(
        (businessConsts.financialReserve * 100).toFixed(2),
      ),
      cardAcquiring: Number((businessConsts.cardAcquiring * 100).toFixed(3)),
      qrAcquiring: Number((businessConsts.qrAcquiring * 100).toFixed(3)),
    },
  });

  useEffect(() => {
    form.trigger();
  }, []);

  return form;
};
