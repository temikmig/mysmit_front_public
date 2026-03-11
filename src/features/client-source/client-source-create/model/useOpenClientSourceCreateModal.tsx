import { useModal } from "@app/providers";
import { ClientSourceSearchOption } from "@entities/clientSource";

import { ClientSourceCreateModal } from "../ui";

interface useOpenClientSourceCreateModalOptions {
  onSuccess?: (clientSource: ClientSourceSearchOption) => void;
}

export const useOpenClientSourceCreateModal = (
  options?: useOpenClientSourceCreateModalOptions,
) => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Добавить источник клиента",
      isCloseOverlay: false,
      content: (
        <ClientSourceCreateModal
          onSuccess={(clientSource) => {
            options?.onSuccess?.(clientSource);
          }}
          closeModal={closeModal}
        />
      ),
    });
  };
};
