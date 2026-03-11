import { useModal } from "@app/providers";
import { ClientCarCreateDto, ClientCarSearchOption } from "@entities/client";

import { ClientCarCreateModal } from "../ui";

interface UseOpenClientCarCreateModalOptions {
  onSuccess?: (client: ClientCarSearchOption) => void;
}

export const useOpenClientCarCreateModal = (
  clientId: string,
  options?: UseOpenClientCarCreateModalOptions,
) => {
  const { openModal, closeModal } = useModal();

  return (initial?: Partial<ClientCarCreateDto>) => {
    openModal({
      title: "Добавить автомобиль",
      isCloseOverlay: false,
      width: 400,
      content: (
        <ClientCarCreateModal
          clientId={clientId}
          onSuccess={(clientCar) => {
            options?.onSuccess?.(clientCar);
          }}
          initial={initial}
          closeModal={closeModal}
        />
      ),
    });
  };
};
