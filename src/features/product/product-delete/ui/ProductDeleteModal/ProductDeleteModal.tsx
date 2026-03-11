import { FC } from "react";

import { useProduct } from "@entities/product";
import { Loader } from "@shared/ui";
import { MessageDialog } from "@shared/ui/message-dialog";

import { useDeleteProduct } from "../../model";

interface ProductDeleteModalProps {
  productId: number;
  closeModal: () => void;
}

export const ProductDeleteModal: FC<ProductDeleteModalProps> = ({
  productId,
  closeModal,
}) => {
  const { product, isLoading } = useProduct(productId);

  const { deleteProduct, isLoading: isLoadingDelete } = useDeleteProduct();

  const onSubmit = async () => {
    if (!product) return;

    await deleteProduct(product.id);
    closeModal?.();
  };

  if (isLoading || !product) return <Loader />;

  return (
    <MessageDialog
      description={`Вы действительно хотите удалить товар "${product.name}"?`}
      confirmButton={{
        label: "Удалить",
        onClick: onSubmit,
        disabled: isLoadingDelete,
      }}
    />
  );
};
