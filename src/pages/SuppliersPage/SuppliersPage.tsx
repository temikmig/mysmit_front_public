import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Supplier, useGetSuppliersListQuery } from "@entities/supplier";
import {
  useOpenSupplierCardModal,
  useOpenSupplierCreateModal,
} from "@features/supplier";
import { TablePage } from "@widgets/table-page";

import { useSuppliersActionsColumn, useSuppliersColumns } from "./model";

export const SuppliersPage = () => {
  const { supplierId } = useParams();

  const createClient = useOpenSupplierCreateModal();
  const openSupplierCardModal = useOpenSupplierCardModal();

  const { columns } = useSuppliersColumns();
  const { actionsColumn } = useSuppliersActionsColumn();

  useEffect(() => {
    if (!supplierId) return;

    openSupplierCardModal(Number(supplierId), false);
  }, []);

  return (
    <TablePage<Supplier>
      pageTitle="Контрагенты"
      query={useGetSuppliersListQuery}
      columns={[...columns, actionsColumn]}
      actions={[
        {
          icon: <Add />,
          title: "Добавить поставщика",
          onClick: createClient,
        },
      ]}
    />
  );
};
