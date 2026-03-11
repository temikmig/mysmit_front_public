import { useModal } from "@app/providers";
import { ClientCreateDto, ClientSearchOption } from "@entities/client";

import { ClientCreateModal } from "../ui";

interface UseOpenClientCreateModalOptions {
  onSuccess?: (client: ClientSearchOption) => void;
}

export const useOpenClientCreateModal = (
  options?: UseOpenClientCreateModalOptions,
) => {
  const { openModal, closeModal } = useModal();

  return (initial?: Partial<ClientCreateDto>) => {
    openModal({
      title: "Добавить клиента",
      isCloseOverlay: false,
      width: 800,
      content: (
        <ClientCreateModal
          onSuccess={(client) => {
            options?.onSuccess?.(client);
          }}
          initial={initial}
          closeModal={closeModal}
        />
      ),
    });
  };
};
