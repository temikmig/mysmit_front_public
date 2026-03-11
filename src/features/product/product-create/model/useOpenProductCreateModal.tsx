import { useModal } from "@app/providers";

import { ProductCreateModal } from "../ui";

export const useOpenProductCreateModal = () => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Добавить товар",
      isCloseOverlay: false,
      content: <ProductCreateModal closeModal={closeModal} />,
      width: 800,
    });
  };
};
