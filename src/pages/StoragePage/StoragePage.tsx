import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductListItem, useGetProductsListQuery } from "@entities/product";
import { useAuth } from "@features/auth";
import {
  useOpenProductCardModal,
  useOpenProductCreateModal,
} from "@features/product";
import { TablePage } from "@widgets/table-page";

import {
  FiltersStorage,
  useStorageActionsColumn,
  useStorageColumns,
} from "./model";
import { StorageFilters } from "./StorageFilters";

export const StoragePage = () => {
  const { isAdmin } = useAuth();

  const { productId } = useParams();

  const createProduct = useOpenProductCreateModal();
  const openProductCardModal = useOpenProductCardModal();

  const [filters, setFilters] = useState<FiltersStorage>({});

  const { columns, columnGroupingModel } = useStorageColumns({
    filters: filters,
  });
  const { actionsColumn } = useStorageActionsColumn();

  useEffect(() => {
    if (!productId) return;

    openProductCardModal(Number(productId), false);
  }, []);

  return (
    <TablePage<ProductListItem, unknown>
      pageTitle={filters.serviceName || "Склад"}
      query={useGetProductsListQuery}
      columnGroupingModel={columnGroupingModel}
      columns={[...columns, actionsColumn]}
      filtersState={filters}
      filters={
        <StorageFilters
          value={filters}
          onApply={(data) => {
            setFilters(data);
          }}
        />
      }
      actions={
        isAdmin
          ? [
              {
                icon: <Add />,
                title: "Добавить товар",
                onClick: createProduct,
              },
            ]
          : []
      }
    />
  );
};
