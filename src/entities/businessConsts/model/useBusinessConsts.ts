import { useGetBusinessConstsQuery } from "../api";

export const useBusinessConsts = () => {
  const { data: businessConsts, isLoading } = useGetBusinessConstsQuery();

  return { businessConsts, isLoading };
};
