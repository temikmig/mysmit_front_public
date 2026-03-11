import { useDeleteSupplierMutation } from "@entities/supplier";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteSupplier = () => {
  const { deleteEntity: deleteSupplier, isLoading } = useDeleteEntity<number>(
    useDeleteSupplierMutation,
  );

  return { deleteSupplier, isLoading };
};
