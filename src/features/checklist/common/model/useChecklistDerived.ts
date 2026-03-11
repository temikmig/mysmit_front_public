import { useEffect } from "react";
import {
  Control,
  UseFormSetValue,
  useFormState,
  useWatch,
} from "react-hook-form";

import {
  ChecklistCreateDto,
  ChecklistServiceProduct,
} from "@entities/checklist";
import { productTypesTools } from "@entities/product";

export const useChecklistDerived = (
  control: Control<ChecklistCreateDto>,
  setValue: UseFormSetValue<ChecklistCreateDto>,
  products: ChecklistServiceProduct[],
) => {
  const items = useWatch({ control, name: "items" });
  const { isDirty } = useFormState({ control: control });

  useEffect(() => {
    if (!isDirty) return;

    if (!items) return;

    let direct = 0;
    let tool = 0;

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      if (productTypesTools.has(product.type)) {
        tool += item.writeoffPrice ?? 0;
      } else {
        direct += item.writeoffPrice ?? 0;
      }
    });

    setValue("directExpenses", direct);
    setValue("toolEquipment", tool);
  }, [items, products, setValue, isDirty]);
};
