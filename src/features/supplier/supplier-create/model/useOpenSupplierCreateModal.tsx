import { useModal } from "@app/providers";

import { SupplierCreateModal } from "../ui";

export const useOpenSupplierCreateModal = () => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Добавить контрагента",
      isCloseOverlay: false,
      content: <SupplierCreateModal closeModal={closeModal} />,
      width: 800,
    });
  };
};
