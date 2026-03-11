import { useGetChecklistQuery } from "../api";

export const useChecklist = (checklistId: string) => {
  const { data: checklist, isLoading } = useGetChecklistQuery(checklistId);

  return { checklist, isLoading };
};
