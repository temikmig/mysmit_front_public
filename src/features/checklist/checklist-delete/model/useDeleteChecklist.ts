import { useDeleteChecklistMutation } from "@entities/checklist";
import { useDeleteEntity } from "@shared/lib";

export const useDeleteChecklist = () => {
  const { deleteEntity: deleteChecklist, isLoading } = useDeleteEntity(
    useDeleteChecklistMutation,
  );

  return { deleteChecklist, isLoading };
};
