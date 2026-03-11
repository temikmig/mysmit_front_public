import { useModal } from "@app/providers";

import { ProductGroupEditModal } from "../ui/ProductGroupEditModal/ProductGroupEditModal";

export const useOpenProductGroupEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (productGroupId?: number) => {
    if (!productGroupId) return;

    openModal({
      title: "Редактировать группу товаров",
      isCloseOverlay: false,
      width: 400,
      content: (
        <ProductGroupEditModal
          groupId={productGroupId}
          closeModal={closeModal}
        />
      ),
    });
  };
};
