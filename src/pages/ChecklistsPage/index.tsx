import { useCallback, useRef, useState } from "react";

import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { OptionsDotsHorizontalIcon, PlusMinIcon } from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import type { Checklist, ChecklistStatus } from "../../common/types";

import { useGetChecklistsListQuery } from "../../api/checklistsApi";
import { ChecklistStatusTag } from "../../components/Checklists/ChecklistStatusTag";
import { ChecklistActions } from "../../components/Checklists/ChecklistActions";
import { formatDateToText } from "../../common/functions";
import { useAuth, useHandlers } from "../../common/hooks";
import { ClickLink } from "../../components/ui/ClickLink";

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { isAdmin } = useAuth();

  const { handleChecklistAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Создать чек-лист",
      color: "blue",
      onClick: () => {
        if (isAdmin) handleChecklistAdd();
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

export const ChecklistsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Checklist | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading } = useGetChecklistsListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handleChecklistCard } = useHandlers();

  const columns: Column<Checklist>[] = [
    {
      key: "createAt",
      title: "Дата",
      sort: true,
      width: 120,
      render: (_, c) => <p>{formatDateToText(c.createdAt, "date string")}</p>,
    },
    {
      key: "service",
      title: "Услуга",
      sort: true,
      render: (_, c) => (
        <ClickLink
          onClick={() => {
            handleChecklistCard(c.id);
          }}
        >
          {c.service.name}
        </ClickLink>
      ),
    },

    {
      key: "time",
      title: "Время",
      sort: false,
      render: (_, c) => <p>{c.workTime} мин.</p>,
      width: 80,
    },
    {
      key: "client",
      title: "Клиент",
      sort: true,
      width: 300,
      render: (_, c) => (
        <>
          <p>
            {c.client.firstName} {c.client.lastName}
          </p>
          <p>
            {`${c.car.mark} ${c.car.model} ${
              c.car.number ? `(${c.car.number})` : ``
            }`}
          </p>
        </>
      ),
    },
    {
      key: "status",
      title: "Статус",
      sort: true,
      width: 150,
      render: (_, c) => (
        <ChecklistStatusTag
          min
          fullwidth
          status={c.status as ChecklistStatus}
        />
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, c) => <ChecklistActions checklist={c} />,
      width: 64,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Checklist, order: "asc" | "desc") => {
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
      data={data?.checklists ?? []}
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
