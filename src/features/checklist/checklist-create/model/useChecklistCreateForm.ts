import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ChecklistCreateDto } from "@entities/checklist";
import { AcquiringTypeEnum } from "@entities/moneySource";
import { checklistSchema } from "@features/checklist";

export const useChecklistCreateForm = () => {
  const form = useForm<ChecklistCreateDto>({
    mode: "all",
    shouldUnregister: false,
    resolver: yupResolver(checklistSchema),
    defaultValues: {
      serviceId: undefined,
      checklistDate: new Date(),
      clientId: null,
      clientCarId: null,
      clientString: null,
      clientCarString: null,
      isManualClient: false,
      comment: null,
      itemsComment: null,
      price: 0,
      workTime: 60,
      moneySourceId: undefined,
      acquiringType: AcquiringTypeEnum.NONE,
      employees: [],
      items: [],
      businessExpenses: 0,
      directExpenses: 0,
      toolEquipment: 0,
      salary: 0,
      financialReserve: 0,
      businessGrowth: 0,
      acquiring: 0,
      loyalty: 0,
      loyaltyWriteOff: 0,
      acquisition: 0,
      allCosts: 0,
      profit: 0,
      total: 0,
    },
  });

  const { watch, trigger, setValue } = form;
  const isManualClient = watch("isManualClient");

  useEffect(() => {
    if (isManualClient) {
      setValue("clientId", null);
      setValue("clientCarId", null);
    } else {
      setValue("clientString", null);
      setValue("clientCarString", null);
    }
    trigger(["clientId", "clientString", "clientCarId", "clientCarString"]);
  }, [isManualClient, setValue, trigger]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  return { ...form };
};
