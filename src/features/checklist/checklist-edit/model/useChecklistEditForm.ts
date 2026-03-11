import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Checklist, ChecklistEditDto } from "@entities/checklist";
import { checklistSchema } from "@features/checklist";

export const useChecklistEditForm = (checklist: Checklist) => {
  const form = useForm<ChecklistEditDto>({
    mode: "all",
    shouldUnregister: false,
    resolver: yupResolver(checklistSchema),
    defaultValues: {
      serviceId: checklist.serviceId,
      checklistDate: new Date(checklist.checklistDate),
      clientId: checklist.clientId,
      clientCarId: checklist.clientCarId,
      clientString: checklist.clientString,
      clientCarString: checklist.clientCarString,
      isManualClient: checklist.clientId ? false : true,
      comment: checklist.comment,
      itemsComment: checklist.itemsComment,
      price: checklist.price,
      workTime: checklist.workTime,
      moneySourceId: checklist.moneySourceId,
      acquiringType: checklist.acquiringType,
      employees: checklist.checklistEmployees.map((e) => ({
        employeeId: e.id,
        salary: e.salary,
      })),
      items: checklist.checklistItems.map((i) => ({
        productId: i.product.id,
        quantityUsed: i.quantityUsed,
        writeoffPrice: i.writeoffPrice,
      })),
      businessExpenses: checklist.checklistAnalytics.businessExpenses,
      directExpenses: checklist.checklistAnalytics.directExpenses,
      toolEquipment: checklist.checklistAnalytics.toolEquipment,
      salary: checklist.checklistAnalytics.salary,
      financialReserve: checklist.checklistAnalytics.financialReserve,
      businessGrowth: checklist.checklistAnalytics.businessGrowth,
      acquiring: checklist.checklistAnalytics.acquiring,
      loyalty: checklist.checklistAnalytics.loyalty,
      loyaltyWriteOff: checklist.checklistAnalytics.loyaltyWriteOff,
      acquisition: checklist.checklistAnalytics.acquisition,
      allCosts: checklist.checklistAnalytics.allCosts,
      profit: checklist.checklistAnalytics.profit,
      total: checklist.checklistAnalytics.total,
    },
  });

  const { watch, setValue } = form;
  const isManualClient = watch("isManualClient");

  useEffect(() => {
    if (isManualClient) {
      setValue("clientId", null, { shouldValidate: true });
      setValue("clientCarId", null, { shouldValidate: true });
    } else {
      setValue("clientString", null, { shouldValidate: true });
      setValue("clientCarString", null, { shouldValidate: true });
    }
  }, [isManualClient]);

  return form;
};
