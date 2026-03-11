import { useModal } from "@app/providers";

import { ProductGroup } from "./types";
import { ProductGroupCreateModal } from "../ui/ProductGroupCreateModal/ProductGroupCreateModal";

interface UseOpenProductGroupCreateModalOptions {
  serviceId: number;
  onSuccess?: (productGroup: ProductGroup) => void;
}

export const useOpenProductGroupCreateModal = (
  options: UseOpenProductGroupCreateModalOptions,
) => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      title: "Создать группу товаров",
      isCloseOverlay: false,
      width: 400,
      content: (
        <ProductGroupCreateModal
          serviceId={options.serviceId}
          onSuccess={(productGroup) => {
            options?.onSuccess?.(productGroup);
          }}
          closeModal={closeModal}
        />
      ),
    });
  };
};
