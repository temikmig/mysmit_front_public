import { useNavigate } from "react-router-dom";

import { useModal } from "@app/providers";
import { isMobileRequest } from "@shared/lib";

import { ChecklistDeleteModal } from "../ui";

export const useOpenChecklistDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const isMobile = isMobileRequest();

  return (checklistId: string) =>
    openModal({
      title: "Удалить чек-лист",

      content: (
        <ChecklistDeleteModal
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
