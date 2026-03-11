import { useNavigate } from "react-router-dom";

import { useModal } from "@app/providers";
import { isMobileRequest } from "@shared/lib";

import { ChecklistRejectModal } from "../ui";

export const useOpenChecklistRejectModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();
  const isMobile = isMobileRequest();

  return (checklistId: string) =>
    openModal({
      title: "Отклонить чек-лист",
      content: (
        <ChecklistRejectModal
          checklistId={checklistId}
          closeModal={() => {
            closeModal();
            if (closeParent) {
              if (isMobile) {
                navigate(-1);
                return;
              }
              closeModal();
            }
          }}
        />
      ),
    });
};
