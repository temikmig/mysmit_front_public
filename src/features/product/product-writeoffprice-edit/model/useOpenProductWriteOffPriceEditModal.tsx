import { useModal } from "@app/providers";

import { ProductWriteOffPriceEditModal } from "../ui";

export const useOpenProductWriteOffPriceEditModal = () => {
  const { openModal, closeModal } = useModal();

  return (productId: number) => {
    if (!productId) return;

    openModal({
      title: "Редактировать цену списания",
      isCloseOverlay: false,
      content: (
        <ProductWriteOffPriceEditModal
          productId={productId}
          closeModal={closeModal}
        />
      ),
      width: 400,
    });
  };
};
