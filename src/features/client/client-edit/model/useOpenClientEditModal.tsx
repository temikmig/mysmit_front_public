import { useModal } from "@app/providers";

import { ClientEditModal } from "../ui";

export const useOpenClientEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (clientId: string) => {
    if (!clientId) return;

    openModal({
      title: "Редактировать клиента",
      isCloseOverlay: false,
      content: <ClientEditModal clientId={clientId} closeModal={closeModal} />,
      width: 800,
    });
  };
};
