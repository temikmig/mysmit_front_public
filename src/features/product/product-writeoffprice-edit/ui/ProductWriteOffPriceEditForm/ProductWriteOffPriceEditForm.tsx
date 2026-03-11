import { Button } from "@mui/material";
import { FC } from "react";

import { Product, ProductWriteOffPriceEditDto } from "@entities/product";
import { StackColumn, FormTextField, FormDatePicker } from "@shared/ui";

import { ProductWriteOffPriceFields } from "./ProductWriteOffPriceFields";
import {
  useEditProductWriteOffPrice,
  useProductWriteOffPriceEditForm,
} from "../../model";

interface ProductWriteOffPriceEditFormProps {
  product: Product;
  onClose?: () => void;
}

export const ProductWriteOffPriceEditForm: FC<
  ProductWriteOffPriceEditFormProps
> = ({ product, onClose }) => {
  const { editProductWriteOffPrice, isLoading } = useEditProductWriteOffPrice();

  const { control, handleSubmit, formState, setValue } =
    useProductWriteOffPriceEditForm(product);

  const onSubmit = async (data: ProductWriteOffPriceEditDto) => {
    await editProductWriteOffPrice(product.id, data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormDatePicker
          name="historyDate"
          label="Дата изменения"
          control={control}
        />
        <ProductWriteOffPriceFields
          product={product}
          control={control}
          setValue={setValue}
        />
        <FormTextField
          multiline
          rows={3}
          name="comment"
          label="Комментарий"
          control={control}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Редактировать цену списания
        </Button>
      </StackColumn>
    </form>
  );
};
