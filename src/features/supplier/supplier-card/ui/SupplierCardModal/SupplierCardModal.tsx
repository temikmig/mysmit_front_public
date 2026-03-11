import { FC, useEffect } from "react";

import { useModal } from "@app/providers";
import { SupplierDetails, useSupplier } from "@entities/supplier";
import { Loader, StackColumn } from "@shared/ui";

import { SupplierCardActions } from "../SupplierCardActions";

interface SupplierCardModalProps {
  supplierId: number;
}
export const SupplierCardModal: FC<SupplierCardModalProps> = ({
  supplierId,
}) => {
  const { supplier, isLoading } = useSupplier(supplierId);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!isLoading && !supplier) {
      closeModal();
    }
  }, [isLoading, supplier, closeModal]);

  if (isLoading) return <Loader />;
  if (!supplier) return null;

  return (
    <StackColumn>
      <SupplierDetails supplier={supplier} />
      <SupplierCardActions supplier={supplier} />
    </StackColumn>
  );
};
