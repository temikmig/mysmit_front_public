import { useGetClientSourceQuery } from "../api";

export const useClientSource = (clientSourceId: string) => {
  const { data: clientSource, isLoading } =
    useGetClientSourceQuery(clientSourceId);

  return { clientSource, isLoading };
};
