import { FC } from "react";

import { SupplierCreateForm } from "../SupplierCreateForm";

interface SupplierCreateModalProps {
  closeModal?: () => void;
}

export const SupplierCreateModal: FC<SupplierCreateModalProps> = ({
  closeModal,
}) => {
  return <SupplierCreateForm onClose={closeModal} />;
};
