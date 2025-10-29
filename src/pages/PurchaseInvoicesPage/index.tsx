import { useCallback, useRef, useState } from "react";
import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { AppsAddIcon, OptionsDotsHorizontalIcon } from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import { useGetPurchaseInvoicesListQuery } from "../../api";
import { PurchaseInvoice } from "../../common/types";
import { formatDateToText, moneyFormat } from "../../common/functions";
import { useHandlers } from "../../common/hooks";
import { ClickLink } from "../../components/ui/ClickLink";
import {
  PurchaseInvoicesActions,
  PurchaseInvoiceStatusTag,
} from "../../components/PurchaseInvoices";

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handlePurchaseInvoiceAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <AppsAddIcon />,
      label: "Оформить накладную",
      color: "blue",
      onClick: () => {
        handlePurchaseInvoiceAdd();
      },
    },
  ];

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsActionsOpen((prev) => !prev);
  };

  return (
    <>
      <div ref={buttonRef}>
        <Button icon={<OptionsDotsHorizontalIcon />} onClick={handleActions} />
      </div>
      <ContextMenu
        anchorRef={buttonRef}
        items={items}
        open={isActionsOpen}
        placement="bottom end"
        onClose={() => setIsActionsOpen(false)}
      />
    </>
  );
};

export const PurchaseInvoicesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<
    keyof PurchaseInvoice | undefined
  >("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc"
  );

  const { data, isLoading } = useGetPurchaseInvoicesListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handlePurchaseInvoiceCard } = useHandlers();

  const columns: Column<PurchaseInvoice>[] = [
    {
      key: "name",
      title: "Накладная",
      sort: true,
      render: (_, p) => (
        <ClickLink
          onClick={() => {
            handlePurchaseInvoiceCard(p.id);
          }}
        >{`Накладная "${p.supplier.name}" от ${formatDateToText(
          p.createdAt,
          "date"
        )}`}</ClickLink>
      ),
    },
    {
      key: "supplier",
      title: "Поставщик",
      sort: true,
      render: (_, p) => p.supplier?.name ?? "-",
    },
    {
      key: "total",
      title: "Сумма",
      sort: true,
      render: (_, p) => moneyFormat(p.total),
    },
    {
      key: "createdAt",
      title: "Дата",
      sort: true,
      render: (_, p) => formatDateToText(p.createdAt, "datetime string"),
    },
    {
      key: "createdByUser",
      title: "Создал",
      render: (_, p) =>
        p.createdByUser
          ? `${p.createdByUser.firstName} ${p.createdByUser.lastName}`
          : "-",
    },
    {
      key: "status",
      title: "Статус",
      width: 150,
      render: (_, p) => (
        <PurchaseInvoiceStatusTag min fullwidth status={p.status} />
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, p) => <PurchaseInvoicesActions purchaseInvoice={p} />,
      width: 48,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof PurchaseInvoice, order: "asc" | "desc") => {
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
      data={data?.invoices ?? []}
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
      rightContainer={<RightTableCont />}
    />
  );
};
