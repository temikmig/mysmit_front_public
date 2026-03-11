import { useDeleteClientSourceMutation } from "@entities/clientSource";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteClientSource = () => {
  const { deleteEntity: deleteClientSource, isLoading } =
    useDeleteEntity<string>(useDeleteClientSourceMutation);

  return { deleteClientSource, isLoading };
};
