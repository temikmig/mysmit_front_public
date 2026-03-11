import { useDeleteClientCarMutation } from "@entities/client";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteClientCar = () => {
  const { deleteEntity: deleteClientCar, isLoading } = useDeleteEntity<string>(
    useDeleteClientCarMutation,
  );

  return { deleteClientCar, isLoading };
};
