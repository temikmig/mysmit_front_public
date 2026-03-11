import { useModal } from "@app/providers";

import { ServiceDeleteModal } from "../ui";

export const useOpenServiceDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (serviceId: number) =>
    openModal({
      title: "Удалить услугу",
      content: (
        <ServiceDeleteModal
          serviceId={serviceId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
