import { useNavigate } from "react-router-dom";

import { useModal } from "@app/providers";
import { isMobileRequest } from "@shared/lib";

import { ChecklistApproveModal } from "../ui";

export const useOpenChecklistApproveModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const isMobile = isMobileRequest();

  return (checklistId: string) =>
    openModal({
      content: (
        <ChecklistApproveModal
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
