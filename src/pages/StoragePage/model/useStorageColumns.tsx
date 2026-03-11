import { Box, Link, Typography } from "@mui/material";
import {
  GridColDef,
  GridColumnGroupingModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductListItem,
  ProductTypeBadge,
  ProductUnitUsageEnum,
} from "@entities/product";
import { ProductGroupSelect } from "@features/assign-product-group";
import { useOpenProductCardModal } from "@features/product";
import { formatDateToText, formatMinutes, moneyFormat } from "@shared/lib";

import { FiltersStorage } from "./types";

export const useStorageColumns = ({
  filters,
}: {
  filters?: FiltersStorage;
}) => {
  const openProduct = useOpenProductCardModal();

  const columns: GridColDef<ProductListItem>[] = [
    {
      field: "name",
      headerName: "Наименование товара",
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={0.5}
        >
          <Link onClick={() => openProduct(params.row.id, true)}>
            {params.row.name}
          </Link>
          {params.row.shortName && (
            <Typography variant="body2" color="text.secondary">
              {params.row.shortName}
            </Typography>
          )}
          <ProductTypeBadge productType={params.row.type}></ProductTypeBadge>
        </Box>
      ),
    },
    ...(filters?.serviceId
      ? [
          {
            field: "serviceGroup",
            headerName: "Группа",
            width: 150,
            renderCell: (params: GridRenderCellParams<ProductListItem>) =>
              filters.serviceId && (
                <ProductGroupSelect
                  group={params.row.productGroup}
                  productId={params.row.id}
                  serviceId={filters.serviceId}
                />
              ),
          },
        ]
      : []),
    {
      field: "quantity",
      headerName: "Товар",
      align: "right",
      headerAlign: "right",
      width: 100,
      valueGetter: (_, row) => row.stockBalance?.quantity ?? 0,
      renderCell: (params) =>
        `${params.value ?? 0} ${params.row.unitStorage.shortName}`,
    },
    {
      field: "resourceQuantity",
      headerName: "Ресурс",
      align: "right",
      headerAlign: "right",
      width: 100,
      valueGetter: (_, row) => row.stockBalance?.resourceQuantity ?? 0,
      renderCell: (params) =>
        params.row.unitUsage === ProductUnitUsageEnum.MINUTES
          ? formatMinutes(params.row.stockBalance.resourceQuantity)
          : `${params.row.stockBalance?.resourceQuantity} ${
              PRODUCT_UNIT_USAGE_LABELS_SHORT[params.row.unitUsage]
            }`,
    },

    {
      field: "price",
      headerName: "Цена",
      align: "right",
      headerAlign: "right",
      width: 150,
      valueGetter: (_, row) => row.lastBatch?.price ?? 0,
      renderCell: (params) => (params.value ? moneyFormat(params.value) : "-"),
    },
    {
      field: "receivedAt",
      headerName: "Дата",
      align: "right",
      headerAlign: "right",
      width: 150,
      valueGetter: (_, row) => row.lastBatch?.receivedAt ?? null,
      renderCell: (params) =>
        params.value ? formatDateToText(params.value, "date") : "-",
    },
    {
      field: "currentWriteoffPrice",
      headerName: "Цена списания",
      align: "right",
      headerAlign: "right",
      width: 150,
      valueGetter: (_, row) => row.currentWriteoffPrice ?? 0,
      renderCell: (params) => moneyFormat(params.value ?? 0),
    },
    {
      field: "reserveValue",
      headerName: "Накоплено",
      align: "right",
      headerAlign: "right",
      width: 150,
      valueGetter: (_, row) => row.reserveValue ?? 0,
      renderCell: (params) => moneyFormat(params.value ?? 0),
    },
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "stockBalance",
      headerName: "Остатки",
      headerAlign: "center",
      children: [{ field: "quantity" }, { field: "resourceQuantity" }],
    },
    {
      groupId: "lastBatch",
      headerName: "Последняя партия",
      headerAlign: "center",
      children: [{ field: "price" }, { field: "receivedAt" }],
    },
  ];
  return { columns, columnGroupingModel };
};
