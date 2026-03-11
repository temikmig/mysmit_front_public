import { ROUTES } from "@app/constants";
import { useOpenEntityModal } from "@shared/lib";

import { ProductCardModal } from "../ui";

export const useOpenProductCardModal = () => {
  const open = useOpenEntityModal();

  return (productId?: number, pushUrl = false) => {
    if (!productId) return;

    open(
      <ProductCardModal productId={productId} />,
      "Карточка товара",
      productId,
      ROUTES.STORAGE,
      pushUrl,
      1200,
      true,
    );
  };
};
