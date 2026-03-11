import { useDeleteClientMutation } from "@entities/client";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteClient = () => {
  const { deleteEntity: deleteClient, isLoading } = useDeleteEntity<string>(
    useDeleteClientMutation,
  );

  return { deleteClient, isLoading };
};
