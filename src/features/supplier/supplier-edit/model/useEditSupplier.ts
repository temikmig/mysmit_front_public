import {
  Supplier,
  SupplierEditDto,
  useEditSupplierMutation,
} from "@entities/supplier";
import { useEditEntity } from "@shared/lib";

export const useEditSupplier = () => {
  const { editEntity: editSupplier, isLoading } = useEditEntity<
    SupplierEditDto,
    Supplier,
    number
  >(useEditSupplierMutation);

  return { editSupplier, isLoading };
};
