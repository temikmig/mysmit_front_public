import { useModal } from "@app/providers";

import { ServiceEditModal } from "../ui";

export const useOpenServiceEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (serviceId: number) => {
    if (!serviceId) return;

    openModal({
      title: "Редактировать услугу",
      isCloseOverlay: false,
      content: (
        <ServiceEditModal serviceId={serviceId} closeModal={closeModal} />
      ),
    });
  };
};
