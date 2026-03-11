import { useModal } from "@app/providers";

import { ProductDeleteModal } from "../ui";

export const useOpenProductDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (productId: number) =>
    openModal({
      title: "Удалить товар",

      content: (
        <ProductDeleteModal
          productId={productId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
