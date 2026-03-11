import { useWatch, Control, FieldValues, Path } from "react-hook-form";

import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  TIME_UNITS,
  UNIT_USAGE_MAP,
  TimeUnit,
} from "@entities/product";
import { thousandFormat } from "@shared/lib";

interface UseResourceHintProps<T extends FieldValues> {
  control: Control<T>;
}

export const useResourceHint = <T extends FieldValues>({
  control,
}: UseResourceHintProps<T>) => {
  const resourceValue = useWatch({
    control,
    name: "resourceValue" as Path<T>,
  });

  const selectedUnitUsage = useWatch({
    control,
    name: "unitUsage" as Path<T>,
  });

  const unitPack = useWatch({
    control,
    name: "unitPack" as Path<T>,
  });

  const hint =
    resourceValue &&
    selectedUnitUsage &&
    (TIME_UNITS.has(selectedUnitUsage as TimeUnit) || unitPack > 1)
      ? `${unitPack > 1 ? `Упаковка ${unitPack} шт по` : ``} ${thousandFormat(resourceValue)} ${PRODUCT_UNIT_USAGE_LABELS_SHORT[selectedUnitUsage]} = ${thousandFormat(
          (UNIT_USAGE_MAP[selectedUnitUsage as TimeUnit] || 1) *
            resourceValue *
            unitPack,
        )} ${TIME_UNITS.has(selectedUnitUsage as TimeUnit) ? `минут` : PRODUCT_UNIT_USAGE_LABELS_SHORT[selectedUnitUsage]}`
      : "";

  return hint;
};
