import { useModal } from "@app/providers";

import { SupplierEditModal } from "../ui";

export const useOpenSupplierEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (supplierId: number) => {
    if (!supplierId) return;

    openModal({
      title: "Редактировать контрагента",
      isCloseOverlay: false,
      content: (
        <SupplierEditModal supplierId={supplierId} closeModal={closeModal} />
      ),
      width: 800,
    });
  };
};
