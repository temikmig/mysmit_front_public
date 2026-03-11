import { FC } from "react";

import { useSupplier } from "@entities/supplier";
import { Loader } from "@shared/ui";

import { SupplierEditForm } from "../SupplierEditForm";

interface SupplierEditModalProps {
  supplierId: number;
  closeModal?: () => void;
}

export const SupplierEditModal: FC<SupplierEditModalProps> = ({
  supplierId,
  closeModal,
}) => {
  const { supplier, isLoading } = useSupplier(supplierId);

  if (isLoading || !supplier) return <Loader />;

  return <SupplierEditForm supplier={supplier} onClose={closeModal} />;
};
