import { useGetProductQuery } from "../api";

export const useProduct = (productId: number) => {
  const { data: product, isLoading } = useGetProductQuery(productId);

  return { product, isLoading };
};
