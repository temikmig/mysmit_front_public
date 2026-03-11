import { useModal } from "@app/providers";
import { ServiceCreateDto, ServiceSearchOption } from "@entities/service";

import { ServiceCreateModal } from "../ui";

interface useOpenServiceCreateModalOptions {
  onSuccess?: (service: ServiceSearchOption) => void;
}

export const useOpenServiceCreateModal = (
  options?: useOpenServiceCreateModalOptions,
) => {
  const { openModal, closeModal } = useModal();

  return (initial?: Partial<ServiceCreateDto>) => {
    openModal({
      title: "Добавить услугу",
      isCloseOverlay: false,
      content: (
        <ServiceCreateModal
          onSuccess={(service) => {
            options?.onSuccess?.(service);
          }}
          initial={initial}
          closeModal={closeModal}
        />
      ),
    });
  };
};
