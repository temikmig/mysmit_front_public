import { FC } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import {
  Product,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductWriteOffPriceEditDto,
} from "@entities/product";
import { StackRow, FormNumberField, NumberField } from "@shared/ui";

interface ProductWriteOffPriceFieldsProps {
  product: Product;
  control: Control<ProductWriteOffPriceEditDto>;
  setValue: UseFormSetValue<ProductWriteOffPriceEditDto>;
}

export const ProductWriteOffPriceFields: FC<
  ProductWriteOffPriceFieldsProps
> = ({ product, control, setValue }) => {
  const writeOffPrice = useWatch({
    control,
    name: "writeOffPrice",
  });

  const usagePrice = product.currentConversionFactor
    ? writeOffPrice * product.currentConversionFactor
    : 0;

  const handleUsageChange = (val: number) => {
    const newStoragePrice = product.currentConversionFactor
      ? val / product.currentConversionFactor
      : 0;

    setValue("writeOffPrice", newStoragePrice, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <StackRow gap={2}>
      <FormNumberField
        moneyMode
        name="writeOffPrice"
        label={`За 1 ${product.unitStorage.shortName}`}
        control={control}
      />

      <NumberField
        moneyMode
        label={`За 1 ${PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}`}
        value={usagePrice}
        onChange={handleUsageChange}
      />
    </StackRow>
  );
};
