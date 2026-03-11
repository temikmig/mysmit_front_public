import {
  Product,
  ProductEditDto,
  useEditProductMutation,
} from "@entities/product";
import { useEditEntity } from "@shared/lib";

export const useEditProduct = () => {
  const { editEntity: editProduct, isLoading } = useEditEntity<
    ProductEditDto,
    Product,
    number
  >(useEditProductMutation);

  return { editProduct, isLoading };
};
