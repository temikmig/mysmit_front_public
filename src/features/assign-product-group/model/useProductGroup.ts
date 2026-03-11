import { useGetProductGroupQuery } from "../api";

export const useProductGroup = (groupId: number) => {
  const { data: productGroup, isLoading } = useGetProductGroupQuery(groupId);

  return { productGroup, isLoading };
};
