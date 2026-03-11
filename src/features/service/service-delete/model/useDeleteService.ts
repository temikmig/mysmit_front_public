import { useDeleteServiceMutation } from "@entities/service";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteService = () => {
  const { deleteEntity: deleteService, isLoading } = useDeleteEntity<number>(
    useDeleteServiceMutation,
  );

  return { deleteService, isLoading };
};
