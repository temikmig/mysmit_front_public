import { useGetSupplierQuery } from "../api";

export const useSupplier = (supplierId: number) => {
  const { data: supplier, isLoading } = useGetSupplierQuery(supplierId);

  return { supplier, isLoading };
};
