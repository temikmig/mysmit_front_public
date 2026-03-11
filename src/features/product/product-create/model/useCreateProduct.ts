import {
  Product,
  ProductCreateDto,
  useCreateProductMutation,
} from "@entities/product";
import { useCreateEntity } from "@shared/lib";

export const useCreateProduct = () => {
  const { createEntity: createProduct, isLoading } = useCreateEntity<
    ProductCreateDto,
    Product
  >(useCreateProductMutation);

  return { createProduct, isLoading };
};
