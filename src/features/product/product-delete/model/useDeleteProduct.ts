import { useDeleteProductMutation } from "@entities/product";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteProduct = () => {
  const { deleteEntity: deleteProduct, isLoading } = useDeleteEntity<number>(
    useDeleteProductMutation,
  );

  return { deleteProduct, isLoading };
};
