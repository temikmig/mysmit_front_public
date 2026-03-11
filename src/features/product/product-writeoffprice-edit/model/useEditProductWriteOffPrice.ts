import {
  ProductWriteOffPrice,
  ProductWriteOffPriceEditDto,
  useEditProductWriteOffPriceMutation,
} from "@entities/product";
import { useEditEntity } from "@shared/lib";

export const useEditProductWriteOffPrice = () => {
  const { editEntity: editProductWriteOffPrice, isLoading } = useEditEntity<
    ProductWriteOffPriceEditDto,
    ProductWriteOffPrice,
    number
  >(useEditProductWriteOffPriceMutation);

  return { editProductWriteOffPrice, isLoading };
};
