import { useCallback, useRef, useState } from "react";

import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { OptionsDotsHorizontalIcon, PlusMinIcon } from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import { useGetClientSourcesListQuery } from "../../api";
import type { ClientSource } from "../../common/types";
import { useHandlers } from "../../common/hooks";
import { ClickLink } from "../../components/ui/ClickLink";
import { ClientSourcesActions } from "../../components/ClientSources";

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleClientSourceAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Добавить источник",
      color: "blue",
      onClick: () => {
        handleClientSourceAdd();
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

export const ClientSourcesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof ClientSource | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading } = useGetClientSourcesListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handleClientSourceCard } = useHandlers();

  const columns: Column<ClientSource>[] = [
    {
      key: "name",
      title: "Наименование источника",
      sort: true,
      render: (_, s) => (
        <>
          <ClickLink
            onClick={() => {
              handleClientSourceCard(s.id);
            }}
          >
            {s.name}
          </ClickLink>
        </>
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, s) => <ClientSourcesActions clientSource={s} />,
      width: 96,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof ClientSource, order: "asc" | "desc") => {
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
      data={data?.sources ?? []}
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
