import { FC } from "react";

import { ProductCreateForm } from "../ProductCreateForm";

interface ProductCreateModalProps {
  closeModal?: () => void;
}

export const ProductCreateModal: FC<ProductCreateModalProps> = ({
  closeModal,
}) => {
  return <ProductCreateForm onClose={closeModal} />;
};
