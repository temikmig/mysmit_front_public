import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Checklist } from "@entities/checklist";
import { useAuth } from "@features/auth";
import {
  useOpenChecklistApproveModal,
  useOpenChecklistDeleteModal,
  useOpenChecklistEditModal,
} from "@features/checklist";
import { useOpenChecklistRejectModal } from "@features/checklist/checklist-reject";
import { isMobileRequest } from "@shared/lib";
import { ActionsBox } from "@shared/ui";

interface ChecklistCardActionsProps {
  checklist: Checklist;
}
export const ChecklistCardActions: FC<ChecklistCardActionsProps> = ({
  checklist,
}) => {
  const { isAdmin, user } = useAuth();
  const isMobile = isMobileRequest();
  const navigate = useNavigate();

  const openEdit = useOpenChecklistEditModal();
  const openDelete = useOpenChecklistDeleteModal(true);
  const openApprove = useOpenChecklistApproveModal(true);
  const openReject = useOpenChecklistRejectModal(true);

  const handleOpenEdit = () => {
    if (isMobile) {
      navigate(`/m/edit-checklist/${checklist.id}`);
      return;
    }
    openEdit(checklist.id);
  };

  const isAwaitingSenior = checklist.status === "AWAITING_SENIOR";
  const isAwaitingManager = checklist.status === "AWAITING_MANAGER";

  const canApprove =
    (isAwaitingSenior && user?.role === "SENIOR_WORKER") ||
    (isAwaitingManager && isAdmin);

  const approveText = isAwaitingSenior ? "Согласовать" : "Подтвердить";

  const editExtraText =
    isAwaitingSenior && user?.role === "SENIOR_WORKER"
      ? "и согласовать"
      : isAwaitingManager
        ? "и подтвердить"
        : "";

  return (
    <ActionsBox>
      {canApprove && (
        <Button
          startIcon={<TaskAltIcon />}
          onClick={() => openApprove(checklist.id)}
          color="success"
        >
          {approveText}
        </Button>
      )}
      <Button startIcon={<SettingsIcon />} onClick={handleOpenEdit}>
        Редактировать {editExtraText}
      </Button>

      {isAdmin ? (
        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(checklist.id)}
        >
          Удалить
        </Button>
      ) : (
        canApprove && (
          <Button
            startIcon={<ReportIcon />}
            onClick={() => openReject(checklist.id)}
            color="error"
          >
            Отклонить
          </Button>
        )
      )}
    </ActionsBox>
  );
};
