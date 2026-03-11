import { useModal } from "@app/providers";

import { ChecklistEditModal } from "../ui";

export const useOpenChecklistEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (checklistId?: string) => {
    if (!checklistId) return;

    openModal({
      title: "Редактировать чек-лист",
      isCloseOverlay: false,
      fullsizeButton: true,
      content: (
        <ChecklistEditModal checklistId={checklistId} closeModal={closeModal} />
      ),
      width: 1200,
    });
  };
};
