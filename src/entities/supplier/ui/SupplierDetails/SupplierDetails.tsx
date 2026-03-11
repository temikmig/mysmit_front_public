import { FC } from "react";

import { Supplier } from "@entities/supplier";
import { InfoField, StackColumn } from "@shared/ui";

interface SupplierDetailsProps {
  supplier: Supplier;
}

export const SupplierDetails: FC<SupplierDetailsProps> = ({ supplier }) => {
  return (
    <StackColumn>
      <InfoField
        label={`Наименование контрагента ${supplier.isSupplier ? "(является поставщиком)" : ""}`}
        value={`${supplier.name}`}
      />
      <InfoField
        label="Контактная информация"
        value={`${supplier.contactInfo}`}
      />
    </StackColumn>
  );
};
