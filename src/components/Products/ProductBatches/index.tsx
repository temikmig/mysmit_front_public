import { useCallback, useState } from "react";
import { useGetProductBatchesQuery } from "../../../api";
import { BadgeIcon } from "../../../assets/icons";
import { formatDateToText, moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";
import { ProductBatch } from "../../../common/types";
import { ClickLink } from "../../ui/ClickLink";
import { IconButton } from "../../ui/IconButton";
import LoaderPage from "../../ui/LoaderPage";
import { Column, Table } from "../../ui/Table";

import styles from "./ProductBatches.module.css";

interface ProductBatchesProps {
  productId: number;
}

export const ProductBatches = ({ productId }: ProductBatchesProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortColumn, setSortColumn] = useState<keyof ProductBatch | undefined>(
    "receivedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc"
  );

  const { data: productBatches, isLoading } = useGetProductBatchesQuery({
    productId,
    page,
    limit,
    sortColumn,
    sortOrder,
  });

  const { handleSupplierCard, handlePurchaseInvoiceCard } = useHandlers();

  const columns: Column<ProductBatch>[] = [
    {
      key: "supplierName",
      title: "Поставщик",
      render: (_, b) => (
        <ClickLink
          onClick={() => {
            handleSupplierCard(b.supplierId);
          }}
        >
          {b.supplierName}
        </ClickLink>
      ),
    },
    {
      key: "receivedAt",
      title: "Дата поставки",
      width: 200,
      sort: true,
      render: (_, b) => (
        <div className={styles.batchDateCont}>
          {formatDateToText(b.receivedAt, "datetime string")}
          <IconButton
            tooltip="Открыть накладную"
            onClick={() => {
              handlePurchaseInvoiceCard(b.purchaseInvoiceId);
            }}
            variant="outline"
            icon={<BadgeIcon />}
          />
        </div>
      ),
    },
    {
      key: "quantity",
      title: "Кол-во",
      sort: true,
      width: 100,
      align: "right",
      render: (_, b) => `${b.quantity} ${b.unitStorage}`,
    },
    {
      key: "price",
      title: "Стоимость",
      sort: true,
      width: 100,
      align: "right",
      render: (_, b) => moneyFormat(b.price, 4),
    },
  ];

  const handleSortChange = useCallback(
    (col: keyof ProductBatch, order: "asc" | "desc") => {
      setSortColumn(col);
      setSortOrder(order);
      setPage(1);
    },
    []
  );

  if (isLoading) return <LoaderPage />;

  if (productBatches)
    return (
      <div className={styles.productBatchesCont}>
        <h5>Информация о поставках товара</h5>
        <Table
          columns={columns}
          data={productBatches.batches ?? []}
          rowKey={(r) => r.id}
          search={false}
          total={productBatches?.total ?? 0}
          page={page}
          onPageSizeChange={setLimit}
          pageSize={limit}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
    );
};
