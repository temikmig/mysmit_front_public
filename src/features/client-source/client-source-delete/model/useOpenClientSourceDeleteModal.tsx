import { useModal } from "@app/providers";

import { ClientSourceDeleteModal } from "../ui";

export const useOpenClientSourceDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (clientSourceId: string) =>
    openModal({
      title: "Удалить источник клиента",
      content: (
        <ClientSourceDeleteModal
          clientSourceId={clientSourceId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
