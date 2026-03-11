import { useModal } from "@app/providers";

import { ChecklistCreateModal } from "../ui";

export const useOpenChecklistCreateModal = () => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Создать чек-лист",
      isCloseOverlay: false,
      fullsizeButton: true,
      content: <ChecklistCreateModal closeModal={closeModal} />,
      width: 1200,
    });
  };
};
