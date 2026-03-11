import {
  Checklist,
  ChecklistEditDto,
  useEditChecklistMutation,
} from "@entities/checklist";
import { useEditEntity } from "@shared/lib";

export const useEditChecklist = () => {
  const { editEntity: editChecklist, isLoading } = useEditEntity<
    ChecklistEditDto,
    Checklist,
    string
  >(useEditChecklistMutation);

  return { editChecklist, isLoading };
};
