import { useModal } from "@app/providers";

import { ProductEditModal } from "../ui";

export const useOpenProductEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (productId: number) => {
    if (!productId) return;

    openModal({
      title: "Редактировать товар",
      isCloseOverlay: false,
      content: (
        <ProductEditModal productId={productId} closeModal={closeModal} />
      ),
      width: 1000,
    });
  };
};
