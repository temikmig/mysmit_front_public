import { useCallback, useRef, useState } from "react";

import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { OptionsDotsHorizontalIcon, PlusMinIcon } from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import { useGetSuppliersListQuery } from "../../api";
import { SuppliersActions } from "../../components/Suppliers/SuppliersActions";
import type { Supplier } from "../../common/types";
import { useHandlers } from "../../common/hooks";
import { ClickLink } from "../../components/ui/ClickLink";

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleSupplierAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Добавить поставщика",
      color: "blue",
      onClick: () => {
        handleSupplierAdd();
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

export const SuppliersPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Supplier | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading } = useGetSuppliersListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handleSupplierCard } = useHandlers();

  const columns: Column<Supplier>[] = [
    {
      key: "name",
      title: "Наименование поставщика",
      sort: true,
      render: (_, s) => (
        <>
          <ClickLink
            onClick={() => {
              handleSupplierCard(s.id);
            }}
          >
            {s.name}
          </ClickLink>
        </>
      ),
    },
    {
      key: "contactInfo",
      title: "Контактная информация",
      sort: true,
      render: (_, s) => (
        <>
          <p>{s.contactInfo}</p>
        </>
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, s) => <SuppliersActions supplier={s} />,
      width: 96,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Supplier, order: "asc" | "desc") => {
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
      data={data?.suppliers ?? []}
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
