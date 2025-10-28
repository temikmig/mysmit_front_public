import { useCallback, useState } from "react";
import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductType,
  type StockMovement,
  type StockMovementType,
} from "../../common/types";
import { useGetStockMovementsQuery } from "../../api";
import { StockMovementsTypeTag } from "../../components/StockMovements/StockMovementsTypeTag";
import { formatDateToText, moneyFormat } from "../../common/functions";
import { ClickLink } from "../../components/ui/ClickLink";
import { useHandlers } from "../../common/hooks";
import { ProductTypeTag } from "../../components/Products";

import styles from "./StockMovementsPage.module.css";

export const StockMovementsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof StockMovement | undefined>(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc"
  );

  const { data, isLoading } = useGetStockMovementsQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const {
    handleChecklistCard,
    handlePurchaseInvoiceCard,
    handleProductCard,
    handleInventoryCard,
  } = useHandlers();

  const columns: Column<StockMovement>[] = [
    {
      key: "movement",
      title: "Движение",
      sort: true,
      width: 120,
      render: (_, s) => (
        <StockMovementsTypeTag
          fullwidth
          min
          type={s.type as StockMovementType}
        />
      ),
    },
    {
      key: "product",
      title: "Товар",
      sort: true,
      render: (_, s) => (
        <div className={styles.productName}>
          <ClickLink
            onClick={() => {
              handleProductCard(s.product.id);
            }}
          >
            {s.product.name}
          </ClickLink>
          <p style={{ color: "var(--text-gray)" }}>{s.product.shortName}</p>
          <ProductTypeTag min type={s.product.type as ProductType} />
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "Дата",
      sort: true,
      width: 150,
      render: (_, s) => <p>{formatDateToText(s.createdAt, "datetime")}</p>,
    },

    {
      key: "quantity",
      title: "Количество",
      sort: true,
      width: 150,
      render: (_, s) => (
        <>
          {s.quantity !== 0 && (
            <p>
              Товар: {s.type === "IN" ? "+" : "-"}
              {s.quantity} {s.product.unitStorage.shortName}
            </p>
          )}
          {s.resourceQuantity !== 0 && (
            <p>
              Ресурс: {s.type === "IN" ? "+" : "-"}
              {s.resourceQuantity}{" "}
              {PRODUCT_UNIT_USAGE_LABELS_SHORT[s.product.unitUsage]}
            </p>
          )}
        </>
      ),
    },
    {
      key: "reserveValue",
      title: "Резерв",
      sort: true,
      width: 100,
      render: (_, s) =>
        s.reserveValue && (
          <p
            style={{
              color:
                s.reserveValue > 0 ? "var(--text-green)" : "var(--text-red)",
            }}
          >
            {s.reserveValue > 0 ? `+` : ``}
            {moneyFormat(s.reserveValue)}
          </p>
        ),
    },
    {
      key: "document",
      title: "Документ",
      width: 300,
      sort: true,
      render: (_, s) => (
        <>
          {s.checklistId && (
            <ClickLink onClick={() => handleChecklistCard(s.checklistId!)}>
              Чек-лист "{s.checklist?.service.name}" от{" "}
              {formatDateToText(s.checklist?.createdAt, "date")}
            </ClickLink>
          )}
          {s.purchaseInvoiceId && (
            <ClickLink
              onClick={() => {
                if (s.purchaseInvoiceId)
                  handlePurchaseInvoiceCard(s.purchaseInvoiceId);
              }}
            >{`Накладная "${
              s.purchaseInvoice?.supplier.name
            }" от ${formatDateToText(
              s.purchaseInvoice?.createdAt,
              "date"
            )}`}</ClickLink>
          )}
          {s.inventoryId && (
            <ClickLink
              onClick={() => {
                if (s.inventoryId) handleInventoryCard(s.inventoryId);
              }}
            >{`Инвентаризация от ${formatDateToText(
              s.inventory?.createdAt,
              "date"
            )}`}</ClickLink>
          )}
        </>
      ),
    },

    {
      key: "comment",
      title: "Комментарий",
      sort: false,
      render: (_, s) => <>{s.comment}</>,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof StockMovement, order: "asc" | "desc") => {
      setSortColumn(col);
      setSortOrder(order);
      setPage(1);
    },
    []
  );

  if (isLoading) return <LoaderPage />;

  return (
    <Table
      columns={columns}
      data={data?.stockMovements ?? []}
      rowKey={(r) => r.id}
      total={data?.total ?? 0}
      page={page}
      pageSize={limit}
      onPageChange={setPage}
      onPageSizeChange={setLimit}
      searchValue={search}
      onSearchChange={handleSearchChange}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
    />
  );
};
