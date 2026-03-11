/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ChecklistDetails, useChecklist } from "@entities/checklist";
import { useAuth } from "@features/auth";
import { Loader, MobilePaper } from "@shared/ui";

import { ChecklistCardActions } from "../ChecklistCardActions";

export const ChecklistCardScreen: FC = () => {
  const { isAdmin, user } = useAuth();

  const navigate = useNavigate();

  const { checklistId } = useParams();

  if (!checklistId) return;

  const { checklist, isLoading } = useChecklist(checklistId);

  useEffect(() => {
    if (!isLoading && !checklist) {
      navigate("/m/checklists");
    }
  }, [isLoading, checklist, navigate]);

  if (isLoading) return <Loader />;
  if (!checklist) return null;

  return (
    <MobilePaper title="Чек-лист">
      <ChecklistDetails checklist={checklist} />
      {(checklist.status === "REJECTED" ||
        checklist.status === "AWAITING_SENIOR" ||
        (checklist.status === "AWAITING_MANAGER" &&
          user?.role === "SENIOR_WORKER") ||
        isAdmin) && <ChecklistCardActions checklist={checklist} />}
    </MobilePaper>
  );
};
