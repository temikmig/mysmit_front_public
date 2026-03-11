import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { SupplierCardModal } from "../ui";

export const useOpenSupplierCardModal = () => {
  const open = useOpenEntityModal();

  return (supplierId?: number, pushUrl = false) => {
    if (!supplierId) return;

    open(
      <SupplierCardModal supplierId={supplierId} />,
      "Контрагент",
      supplierId,
      ROUTES.DIRECTORY.SUPPLIERS,
      pushUrl,
    );
  };
};
