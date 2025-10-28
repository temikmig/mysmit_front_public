// src/pages/Finances/MoneyMovementsPage.tsx
import { useState, useCallback } from "react";
import { useGetMoneyMovementsListQuery } from "../../api/";
import { Table, type Column } from "../../components/ui/Table";
import LoaderPage from "../../components/ui/LoaderPage";
import { type MoneyMovement } from "../../common/types";
import { formatDateToText, moneyFormat } from "../../common/functions";
import { ClickLink } from "../../components/ui/ClickLink";
import { useHandlers } from "../../common/hooks";

import styles from "./MoneyMovementsPage.module.css";
import {
  MoneyMovementsActions,
  MoneyMovementsTag,
  MoneyMovementsTypeTag,
} from "../../components/MoneyMovements";

export const MoneyMovementsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof MoneyMovement | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading } = useGetMoneyMovementsListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handlePurchaseInvoiceCard, handleChecklistCard } = useHandlers();

  const columns: Column<MoneyMovement>[] = [
    {
      key: "type",
      title: "Тип",
      width: 150,
      sort: true,
      render: (_, m) => <MoneyMovementsTypeTag fullwidth min type={m.type} />,
    },
    {
      key: "amount",
      title: "Сумма",
      sort: true,
      width: 120,
      render: (_, m) => (
        <p
          style={{
            color:
              m.type === "INCOME"
                ? "var(--text-green)"
                : m.type === "OUTCOME"
                ? "var(--text-red)"
                : "inherit",
          }}
        >
          {`${
            m.type === "INCOME" ? "+" : m.type === "OUTCOME" ? "-" : ""
          }${moneyFormat(m.amount)}`}
        </p>
      ),
    },
    {
      key: "comment",
      title: "Комментарий",
      render: (_, m) => (
        <>
          <p className={styles.comment}>{m.comment ?? "-"}</p>
          {m.purchaseInvoiceId && (
            <ClickLink
              onClick={() => {
                if (m.purchaseInvoiceId)
                  handlePurchaseInvoiceCard(m.purchaseInvoiceId);
              }}
            >{`Накладная "${
              m.purchaseInvoice?.supplier.name
            }" от ${formatDateToText(
              m.purchaseInvoice?.createdAt,
              "date"
            )}`}</ClickLink>
          )}
          {m.checklistId && (
            <ClickLink
              onClick={() => {
                if (m.checklistId) handleChecklistCard(m.checklistId);
              }}
            >{`Чеклист от ${formatDateToText(
              m.checklist?.createdAt,
              "date"
            )}`}</ClickLink>
          )}
        </>
      ),
    },
    {
      key: "sources",
      title: "Источники",
      width: 200,
      render: (_, m) => (
        <div className={styles.verticalCont}>
          {m.sourceFrom && (
            <MoneyMovementsTag
              fullwidth
              min
              type="out"
              text={m.sourceFrom.name}
            />
          )}
          {m.sourceTo && (
            <MoneyMovementsTag fullwidth min type="in" text={m.sourceTo.name} />
          )}
        </div>
      ),
    },
    {
      key: "funds",
      title: "Фонды",
      width: 200,
      render: (_, m) => (
        <div className={styles.verticalCont}>
          {m.fundFrom && (
            <MoneyMovementsTag
              fullwidth
              min
              type="out"
              text={m.fundFrom.name}
            />
          )}
          {m.fundTo && (
            <MoneyMovementsTag fullwidth min type="in" text={m.fundTo.name} />
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "Дата",
      width: 150,
      sort: true,
      render: (_, m) => <p>{formatDateToText(m.createdAt, "datetime")}</p>,
    },
    {
      key: "actions",
      sort: false,
      render: (_, m) => <MoneyMovementsActions moneyMovement={m} />,
      width: 64,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof MoneyMovement, order: "asc" | "desc") => {
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
      data={data?.moneyMovements ?? []}
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
