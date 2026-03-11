import { FC } from "react";

import { useProduct } from "@entities/product";
import { Loader } from "@shared/ui";

import { ProductEditForm } from "../ProductEditForm";

interface ProductEditModalProps {
  productId: number;
  closeModal?: () => void;
}

export const ProductEditModal: FC<ProductEditModalProps> = ({
  productId,
  closeModal,
}) => {
  const { product, isLoading } = useProduct(productId);

  if (isLoading || !product) return <Loader />;

  return <ProductEditForm product={product} onClose={closeModal} />;
};
