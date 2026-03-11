import { useParams } from "react-router-dom";

import { useChecklist } from "@entities/checklist";
import { Loader, MobilePaper } from "@shared/ui";

import { ChecklistEditForm } from "../ChecklistEditForm";

export const ChecklistEditScreen = () => {
  const { checklistId } = useParams();

  if (!checklistId) return;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { checklist, isLoading } = useChecklist(checklistId);

  if (isLoading) return <Loader />;
  if (!checklist) return null;

  return (
    <MobilePaper title="Редактировать чек-лист">
      <ChecklistEditForm checklist={checklist} />
    </MobilePaper>
  );
};
