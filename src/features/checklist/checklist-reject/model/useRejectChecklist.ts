import {
  Checklist,
  ChecklistRejectDto,
  useRejectChecklistMutation,
} from "@entities/checklist";
import { useEditEntity } from "@shared/lib";

export const useRejectChecklist = () => {
  const { editEntity: rejectChecklist, isLoading } = useEditEntity<
    ChecklistRejectDto,
    Checklist,
    string
  >(useRejectChecklistMutation);

  return { rejectChecklist, isLoading };
};
