import { useCallback, useRef, useState } from "react";

import LoaderPage from "../../components/ui/LoaderPage";
import { Table, type Column } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import {
  OptionsDotsHorizontalIcon,
  PlusMinIcon,
  ShuffleIcon,
} from "../../assets/icons";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../../components/ui/ContextMenu";
import { useGetClientsListQuery } from "../../api";
import type { Client } from "../../common/types";
import { useHandlers } from "../../common/hooks";
import { ClientsActions } from "../../components/Clients";
import { ClickLink } from "../../components/ui/ClickLink";
import { formatDateToText, moneyFormat } from "../../common/functions";
import { ClientLoyaltyCardTag } from "../../components/Clients/ClientLoyaltyCardTag";

import styles from "./ClientsPage.module.css";
import { IconButton } from "../../components/ui/IconButton";

interface RightTableContProps {
  refetch: () => void;
}

const RightTableCont = ({ refetch }: RightTableContProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleClientAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Добавить клиента",
      color: "blue",
      onClick: () => {
        handleClientAdd(refetch);
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

export const ClientsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Client | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data, isLoading, refetch } = useGetClientsListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const {
    handleClientCard,
    handleChecklistCard,
    handleClientTransferLoyaltyBalanceReserve,
  } = useHandlers();

  const columns: Column<Client>[] = [
    {
      key: "lastName",
      title: "Имя клиента",
      sort: true,
      render: (_, c) => (
        <ClickLink
          onClick={() => {
            handleClientCard(c.id);
          }}
        >
          {c.firstName} {c.lastName}
        </ClickLink>
      ),
    },
    {
      key: "phone",
      title: "Номер телефона",
      sort: true,
      width: 120,
      render: (_, c) => c.phone,
    },
    {
      key: "birthday",
      title: "Дата рождения",
      sort: true,
      width: 120,
      render: (_, c) =>
        c.birthday ? formatDateToText(c.birthday, "date string") : "-",
    },
    {
      key: "lastChecklist",
      title: "Последний чек-лист",
      width: 400,
      render: (_, c) => (
        <>
          <ClickLink
            onClick={() => {
              handleChecklistCard(c.lastChecklist.id);
            }}
          >
            {c.lastChecklist &&
              `Чек-лист "${c.lastChecklist.service.name}" от ${formatDateToText(
                c.lastChecklist.createdAt,
                "date"
              )}`}
          </ClickLink>
        </>
      ),
    },
    {
      key: "checklistCount",
      title: "Кол-во чек-листов",
      width: 150,
      render: (_, c) => c.checklistsCount,
    },
    {
      key: "loyaltyСardLevel",
      title: "Уровень",
      sort: true,
      width: 150,
      render: (_, c) =>
        c.loyaltyСardNum && c.loyaltyСardLevel ? (
          <ClientLoyaltyCardTag min loyaltyСardLevel={c.loyaltyСardLevel} />
        ) : (
          "-"
        ),
    },
    {
      key: "loyaltyBalance",
      title: "Баланс",
      sort: true,
      align: "right",
      width: 100,

      render: (_, c) => (
        <div className={styles.loyaltyBalanceCont}>
          {moneyFormat(c.loyaltyBalance)}
          <IconButton
            tooltip="Распределить"
            onClick={() => {
              handleClientTransferLoyaltyBalanceReserve(c.id, refetch);
            }}
            variant="outline"
            icon={<ShuffleIcon />}
          />
        </div>
      ),
    },
    {
      key: "actions",
      sort: false,
      render: (_, c) => <ClientsActions client={c} refetch={refetch} />,
      width: 96,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Client, order: "asc" | "desc") => {
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
      data={data?.clients ?? []}
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
