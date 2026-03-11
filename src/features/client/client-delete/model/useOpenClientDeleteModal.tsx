import { useModal } from "@app/providers";

import { ClientDeleteModal } from "../ui";

export const useOpenClientDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (clientId: string) =>
    openModal({
      title: "Удалить клиента",

      content: (
        <ClientDeleteModal
          clientId={clientId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
