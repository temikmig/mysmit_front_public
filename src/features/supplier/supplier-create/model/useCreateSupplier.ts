import {
  Supplier,
  SupplierCreateDto,
  useCreateSupplierMutation,
} from "@entities/supplier";
import { useCreateEntity } from "@shared/lib";

export const useCreateSupplier = () => {
  const { createEntity: createSupplier, isLoading } = useCreateEntity<
    SupplierCreateDto,
    Supplier
  >(useCreateSupplierMutation);

  return { createSupplier, isLoading };
};
