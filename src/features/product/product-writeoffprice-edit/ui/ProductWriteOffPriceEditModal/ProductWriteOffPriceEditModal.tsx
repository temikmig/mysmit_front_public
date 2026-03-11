import { FC } from "react";

import { useProduct } from "@entities/product";
import { Loader } from "@shared/ui";

import { ProductWriteOffPriceEditForm } from "../ProductWriteOffPriceEditForm/ProductWriteOffPriceEditForm";

interface ProductWriteOffPriceEditModalProps {
  productId: number;
  closeModal?: () => void;
}

export const ProductWriteOffPriceEditModal: FC<
  ProductWriteOffPriceEditModalProps
> = ({ productId, closeModal }) => {
  const { product, isLoading } = useProduct(productId);

  if (isLoading || !product) return <Loader />;

  return (
    <ProductWriteOffPriceEditForm product={product} onClose={closeModal} />
  );
};
