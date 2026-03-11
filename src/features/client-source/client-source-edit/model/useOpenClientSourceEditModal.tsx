import { useModal } from "@app/providers";

import { ClientSourceEditModal } from "../ui";

export const useOpenClientSourceEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (clientSourceId: string) => {
    if (!clientSourceId) return;

    openModal({
      title: "Редактировать источник клиента",
      isCloseOverlay: false,
      content: (
        <ClientSourceEditModal
          clientSourceId={clientSourceId}
          closeModal={closeModal}
        />
      ),
    });
  };
};
