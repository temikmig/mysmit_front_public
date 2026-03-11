import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { ProductDetails, useProduct } from "@entities/product";
import { useAuth } from "@features/auth";
import { Loader, StackColumn } from "@shared/ui";

import { ProductCardActions } from "../ProductCardActions";

interface ProductCardModalProps {
  productId: number;
}
export const ProductCardModal: FC<ProductCardModalProps> = ({ productId }) => {
  const { isAdmin } = useAuth();

  const { product, isLoading } = useProduct(productId);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!isLoading && !product) {
      closeModal();
    }
  }, [isLoading, product, closeModal]);

  if (isLoading) return <Loader />;
  if (!product) return null;

  return (
    <StackColumn>
      <ProductDetails product={product} />
      {isAdmin && <ProductCardActions product={product} />}
    </StackColumn>
  );
};
