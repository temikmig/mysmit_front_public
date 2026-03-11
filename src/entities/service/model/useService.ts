import { useGetServiceQuery } from "../api";

export const useService = (serviceId: number) => {
  const { data: service, isLoading } = useGetServiceQuery(serviceId);

  return { service, isLoading };
};
