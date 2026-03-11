import { useGetClientCarQuery, useGetClientQuery } from "../api";

export const useClient = (clientId: string) => {
  const { data: client, isLoading } = useGetClientQuery(clientId, {
    skip: !clientId,
  });

  return { client, isLoading };
};

export const useClientCar = (clientCarId: string) => {
  const { data: clientCar, isLoading } = useGetClientCarQuery(clientCarId, {
    skip: !clientCarId,
  });

  return { clientCar, isLoading };
};
