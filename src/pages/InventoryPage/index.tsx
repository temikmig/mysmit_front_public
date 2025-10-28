import { useState, useRef, useCallback } from "react";
import { useGetInventoriesListQuery } from "../../api";

import { Column, Table } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Inventory } from "../../common/types";
import { useHandlers } from "../../common/hooks";
import { ContextMenu, ContextMenuItem } from "../../components/ui/ContextMenu";
import { OptionsDotsHorizontalIcon, PlusMinIcon } from "../../assets/icons";
import { ClickLink } from "../../components/ui/ClickLink";
import { formatDateToText } from "../../common/functions";
import {
  InventoryActions,
  InventoryStatusTag,
} from "../../components/Inventory";
import LoaderPage from "../../components/ui/LoaderPage";

interface RightTableContProps {
  refetch: () => void;
}

const RightTableCont = ({ refetch }: RightTableContProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleInventoryAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Создать инвентаризацию",
      color: "blue",
      onClick: () => {
        handleInventoryAdd(refetch);
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

export const InventoryPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Inventory | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading, refetch } = useGetInventoriesListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handleInventoryCard } = useHandlers();

  const columns: Column<Inventory>[] = [
    {
      key: "inventoryDate",
      title: "Инвентаризация",
      sort: true,
      render: (_, i) => (
        <ClickLink
          onClick={() => {
            handleInventoryCard(i.id, refetch);
          }}
        >
          {`Инвентаризация от ${formatDateToText(
            i.inventoryDate,
            "date string"
          )}`}
        </ClickLink>
      ),
    },
    {
      key: "status",
      title: "Статус",
      sort: true,
      width: 200,
      render: (_, i) => <InventoryStatusTag fullwidth min status={i.status} />,
    },
    {
      key: "createdBy",
      title: "Создал",
      sort: true,
      width: 200,
      render: (_, i) => (
        <>
          <p>{`${i.createdByUser.firstName} ${i.createdByUser.lastName}`}</p>
          <p style={{ color: "var(--text-gray)" }}>{`${formatDateToText(
            i.createdAt,
            "datetime"
          )}`}</p>
        </>
      ),
    },
    {
      key: "confirmedBy",
      title: "Подтверждено",
      sort: true,
      width: 200,
      render: (_, i) => (
        <>
          {i.confirmedBy && (
            <p>{`${i.confirmedBy.firstName} ${i.confirmedBy.lastName}`}</p>
          )}
          {i.confirmedAt && (
            <p style={{ color: "var(--text-gray)" }}>{`${formatDateToText(
              i.confirmedAt,
              "datetime"
            )}`}</p>
          )}
        </>
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, i) => <InventoryActions inventory={i} refetch={refetch} />,
      width: 52,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Inventory, order: "asc" | "desc") => {
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
      data={data?.inventories ?? []}
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
      rightContainer={<RightTableCont refetch={refetch} />}
    />
  );
};
