import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { ChecklistDetails, useChecklist } from "@entities/checklist";
import { useAuth } from "@features/auth";
import { BoxColumn, Loader } from "@shared/ui";

import { ChecklistCardActions } from "../ChecklistCardActions";

interface ChecklistCardModalProps {
  checklistId: string;
}
export const ChecklistCardModal: FC<ChecklistCardModalProps> = ({
  checklistId,
}) => {
  const { isAdmin, user } = useAuth();

  const { checklist, isLoading } = useChecklist(checklistId);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!isLoading && !checklist) {
      closeModal();
    }
  }, [isLoading, checklist, closeModal]);

  if (isLoading) return <Loader />;
  if (!checklist) return null;

  return (
    <BoxColumn>
      <ChecklistDetails checklist={checklist} />
      {(checklist.status === "REJECTED" ||
        checklist.status === "AWAITING_SENIOR" ||
        (checklist.status === "AWAITING_MANAGER" &&
          user?.role === "SENIOR_WORKER") ||
        isAdmin) && <ChecklistCardActions checklist={checklist} />}
    </BoxColumn>
  );
};
