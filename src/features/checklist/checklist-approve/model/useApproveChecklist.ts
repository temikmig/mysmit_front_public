import { useApproveChecklistMutation } from "@entities/checklist";
import { useCheckEntity } from "@shared/lib";

export const useApproveChecklist = () => {
  const { checkEntity: approveChecklist, isLoading } = useCheckEntity(
    useApproveChecklistMutation,
  );

  return { approveChecklist, isLoading };
};
