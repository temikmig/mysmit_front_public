import { useModal } from "@app/providers";

import { SupplierDeleteModal } from "../ui";

export const useOpenSupplierDeleteModal = (closeParent?: boolean) => {
  const { openModal, closeModal } = useModal();

  return (supplierId: number) =>
    openModal({
      title: "Удалить контрагента",

      content: (
        <SupplierDeleteModal
          supplierId={supplierId}
          closeModal={() => {
            closeModal();
            if (closeParent) closeModal();
          }}
        />
      ),
    });
};
