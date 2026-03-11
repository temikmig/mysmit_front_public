import {
  Checklist,
  ChecklistCreateDto,
  useCreateChecklistMutation,
} from "@entities/checklist";
import { useCreateEntity } from "@shared/lib";

export const useCreateChecklist = () => {
  const { createEntity: createChecklist, isLoading } = useCreateEntity<
    ChecklistCreateDto,
    Checklist
  >(useCreateChecklistMutation);

  return { createChecklist, isLoading };
};
