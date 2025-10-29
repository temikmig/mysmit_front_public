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
import { useGetEmployeesListQuery } from "../../api";
import type { Employee } from "../../common/types";
import { useHandlers } from "../../common/hooks";
import { EmployeesActions } from "../../components/Employees";
import { ClickLink } from "../../components/ui/ClickLink";
import { formatDateToText, moneyFormat } from "../../common/functions";
import { IconButton } from "../../components/ui/IconButton";

import styles from "./EmployeesPage.module.css";

const RightTableCont = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { handleEmployeeAdd } = useHandlers();

  const items: ContextMenuItem[] = [
    {
      id: "edit",
      icon: <PlusMinIcon />,
      label: "Добавить сотрудника",
      color: "blue",
      onClick: () => {
        handleEmployeeAdd();
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

export const EmployeesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Employee | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const {
    handleEmployeeCard,
    handleChecklistCard,
    handleEmployeeTransferSalaryReserve,
  } = useHandlers();

  const { data, isLoading } = useGetEmployeesListQuery({
    page,
    limit,
    search,
    sortColumn,
    sortOrder,
  });

  const columns: Column<Employee>[] = [
    {
      key: "lastName",
      title: "Сотрудник",
      sort: true,
      render: (_, e) => (
        <>
          <ClickLink
            onClick={() => {
              handleEmployeeCard(e.id);
            }}
          >
            {`${e.firstName} ${e.lastName}`}
          </ClickLink>
        </>
      ),
    },
    {
      key: "lastChecklist",
      title: "Последний чек-лист",
      width: 400,
      render: (_, e) => (
        <>
          <ClickLink
            onClick={() => {
              handleChecklistCard(e.lastChecklist.id);
            }}
          >
            {e.lastChecklist &&
              `Чек-лист "${e.lastChecklist.service.name}" от ${formatDateToText(
                e.lastChecklist.createdAt,
                "date"
              )}`}
          </ClickLink>
        </>
      ),
    },
    {
      key: "checklistCount",
      title: "Кол-во чек-листов",
      width: 200,
      render: (_, e) => e.checklistsCount,
    },
    {
      key: "salaryBalance",
      title: "Зарплатный резерв",
      width: 200,
      align: "right",
      render: (_, e) => (
        <div className={styles.salaryReserveCont}>
          <div>
            <p>{moneyFormat(e.salaryBalance)}</p>
            <p style={{ color: "var(--text-gray)" }}>
              {moneyFormat(e.nominalSalaryBalance)}
            </p>
          </div>
          <IconButton
            tooltip="Распределить"
            onClick={() => {
              handleEmployeeTransferSalaryReserve(e.id);
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
      render: (_, e) => <EmployeesActions employee={e} />,
      width: 138,
    },
  ];

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (col: keyof Employee, order: "asc" | "desc") => {
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
      data={data?.employees ?? []}
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
