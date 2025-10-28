import { useCallback, useRef, useState } from "react";

import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { OptionsDotsHorizontalIcon, PlusMinIcon } from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import { useGetServicesListQuery } from "../../api";

import { ServicesActions } from "../../components/Services/ServicesActions";
import type { Service } from "../../common/types";
import { useHandlers } from "../../common/hooks";
import { ClickLink } from "../../components/ui/ClickLink";

interface RightTableContProps {
  refetch: () => void;
}

const RightTableCont = ({ refetch }: RightTableContProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleServiceAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Добавить услугу",
      color: "blue",
      onClick: () => {
        handleServiceAdd(refetch, undefined);
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

export const ServicesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Service | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading, refetch } = useGetServicesListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const { handleServiceCard } = useHandlers();

  const columns: Column<Service>[] = [
    {
      key: "name",
      title: "Наименование",
      sort: true,
      render: (_, s) => (
        <>
          <ClickLink
            onClick={() => {
              handleServiceCard(s.id);
            }}
          >
            {s.name}
          </ClickLink>
        </>
      ),
    },
    {
      key: "shortName",
      title: "Короткое наименование",
      sort: true,
      render: (_, s) => (
        <>
          <p>{s.shortName}</p>
        </>
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, s) => <ServicesActions service={s} refetch={refetch} />,
      width: 96,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Service, order: "asc" | "desc") => {
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
      data={data?.services ?? []}
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
