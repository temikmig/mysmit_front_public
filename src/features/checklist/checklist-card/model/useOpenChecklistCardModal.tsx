import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { ChecklistCardModal } from "../ui";

export const useOpenChecklistCardModal = () => {
  const open = useOpenEntityModal();

  return (checklistId?: string, pushUrl = false) => {
    if (!checklistId) return;

    open(
      <ChecklistCardModal checklistId={checklistId} />,
      "Чек-лист",
      checklistId,
      ROUTES.CHECKLISTS,
      pushUrl,
      1200,
      true,
    );
  };
};
