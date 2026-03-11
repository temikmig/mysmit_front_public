import { useModal } from "@app/providers";

import { ClientCarEditModal } from "../ui";

export const useOpenClientCarEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (clientCarId: string) => {
    if (!clientCarId) return;

    openModal({
      title: "Редактировать автомобиль",
      isCloseOverlay: false,
      content: (
        <ClientCarEditModal clientCarId={clientCarId} closeModal={closeModal} />
      ),
      width: 400,
    });
  };
};
