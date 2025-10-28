import { useState, useEffect, useCallback } from "react";
import styles from "./PlansReportsPage.module.css";
import {
  formatDateToText,
  getMonthName,
  moneyFormat,
} from "../../common/functions";
import { IconButton } from "../../components/ui/IconButton";
import { AngleLeftIcon, AngleRightIcon } from "../../assets/icons";
import {
  useCloseMonthPlanMutation,
  useGetActiveMonthlyPlanQuery,
  useGetChecklistsListMonthQuery,
  useGetMonthlyPlanQuery,
  useOpenMonthPlanMutation,
} from "../../api";
import Button from "../../components/ui/Button";
import { useHandlers, useSnackbar } from "../../common/hooks";
import { ApiError } from "../../api/baseQuery";
import { PiggyBanks, PlanReportStatusTag } from "../../components/PlansReports";
import clsx from "clsx";
import LoaderPage from "../../components/ui/LoaderPage";
import { Checklist, MonthlyPlanStatusEnum } from "../../common/types";
import { ClickLink } from "../../components/ui/ClickLink";
import { Column, Table } from "../../components/ui/Table";

export const PlansReportsPage = () => {
  const { showSnackbar } = useSnackbar();

  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Checklist | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const { data: checklistsMonth, isLoading: isLoadingList } =
    useGetChecklistsListMonthQuery({
      page,
      limit,
      search,
      sortColumn,
      sortOrder,
      year: currentMonth.year,
      month: currentMonth.month,
    });

  const { handleChecklistCard } = useHandlers();

  const {
    data: activePlan,
    isLoading: isLoadingActive,
    isSuccess: activeLoaded,
  } = useGetActiveMonthlyPlanQuery();

  const { data: monthlyPlan, isLoading: isLoadingPlan } =
    useGetMonthlyPlanQuery(currentMonth, {
      skip: !activeLoaded,
    });

  const [openMonthlyPlan, { isLoading: isLoadingOpen }] =
    useOpenMonthPlanMutation();
  const [closeMonthlyPlan, { isLoading: isLoadingClose }] =
    useCloseMonthPlanMutation();

  const handleOpenMonthlyPlan = async () => {
    await openMonthlyPlan({
      year: currentMonth.year,
      month: currentMonth.month,
    })
      .unwrap()
      .then(() => {
        showSnackbar({
          title: "Сообщение",
          message: `Месяц успешно открыт`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Месяц не может быть открыт`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  const handleCloseMonthlyPlan = async () => {
    await closeMonthlyPlan({
      year: currentMonth.year,
      month: currentMonth.month,
    })
      .unwrap()
      .then(() => {
        showSnackbar({
          title: "Сообщение",
          message: `Месяц успешно закрыт`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Месяц не может быть закрыт`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      let month = prev.month - 1;
      let year = prev.year;
      if (month < 1) {
        month = 12;
        year -= 1;
      }
      return { month, year };
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      let month = prev.month + 1;
      let year = prev.year;
      if (month > 12) {
        month = 1;
        year += 1;
      }
      return { month, year };
    });
  };

  const columns: Column<Checklist>[] = [
    {
      key: "createAt",
      title: "Дата",
      sort: true,
      width: 120,
      render: (_, c) => <p>{formatDateToText(c.createdAt, "date")}</p>,
    },
    {
      key: "service",
      title: "Чеклист",
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
      align: "right",
      render: (_, c) => <p>{c.workTime} мин.</p>,
      width: 79,
    },
    {
      key: "businessExpenses",
      title: "Бизнес-затраты",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.businessExpenses)}</p>,
      width: 80,
    },
    {
      key: "directExpenses",
      title: "Прямые затраты",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.directExpenses)}</p>,
      width: 80,
    },
    {
      key: "toolEquipment",
      title: "Инструменты и оборудование",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.toolEquipment)}</p>,
      width: 120,
    },
    {
      key: "salary",
      title: "Зарплата",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.salary)}</p>,
      width: 80,
    },
    {
      key: "financialReserve",
      title: "Финансовый резерв",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.financialReserve)}</p>,
      width: 80,
    },
    {
      key: "businessGrowth",
      title: "Развитие бизнеса",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.businessGrowth)}</p>,
      width: 80,
    },
    {
      key: "acquiring",
      title: "Процент эквайринга",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.acquiring)}</p>,
      width: 80,
    },
    {
      key: "loyalty",
      title: "Карта лояльности",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.loyalty)}</p>,
      width: 80,
    },
    {
      key: "acquisition",
      title: "Привлечение",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.acquisition)}</p>,
      width: 120,
    },
    {
      key: "total",
      title: "Итого",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.total)}</p>,
      width: 80,
    },
    {
      key: "profit",
      title: "Прибыль",
      sort: false,
      align: "right",
      render: (_, c) => <p>{moneyFormat(c.profit)}</p>,
      width: 80,
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

  useEffect(() => {
    if (activePlan) {
      setCurrentMonth({ month: activePlan.month, year: activePlan.year });
    }
  }, [activePlan]);

  const isLoading =
    isLoadingPlan ||
    isLoadingActive ||
    isLoadingOpen ||
    isLoadingClose ||
    isLoadingList;

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.plansReportsCont}>
      <div className={styles.monthCont}>
        <div className={styles.monthInfoCont}>
          <div className={styles.monthOptions}>
            <IconButton
              onClick={handlePrevMonth}
              icon={<AngleLeftIcon />}
              variant="outline"
            />
            <IconButton
              onClick={handleNextMonth}
              icon={<AngleRightIcon />}
              variant="outline"
            />
          </div>
          <h2>{`${getMonthName(currentMonth.month)} ${
            currentMonth.year
          } г.`}</h2>
          <PlanReportStatusTag
            status={
              monthlyPlan
                ? monthlyPlan.isActive
                  ? MonthlyPlanStatusEnum.ACTIVE
                  : MonthlyPlanStatusEnum.CLOSED
                : MonthlyPlanStatusEnum.UNKNOWN
            }
          />
        </div>
        {monthlyPlan?.isActive ? (
          <Button onClick={handleCloseMonthlyPlan}>Закрыть месяц</Button>
        ) : (
          <Button onClick={handleOpenMonthlyPlan}>Открыть месяц</Button>
        )}
      </div>
      {monthlyPlan ? (
        <>
          <PiggyBanks monthlyPlan={monthlyPlan} />
          <Table
            columns={columns}
            data={checklistsMonth?.checklists ?? []}
            rowKey={(r) => r.id}
            total={checklistsMonth?.total ?? 0}
            page={page}
            pageSize={limit}
            onPageChange={setPage}
            onPageSizeChange={setLimit}
            searchValue={search}
            onSearchChange={handleSearchChange}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            summaryRow={
              checklistsMonth && checklistsMonth.total > 0
                ? {
                    time: `${checklistsMonth.sums.workTime} мин.`,
                    businessExpenses: moneyFormat(
                      checklistsMonth.sums.businessExpenses
                    ),
                    directExpenses: moneyFormat(
                      checklistsMonth.sums.directExpenses
                    ),
                    acquisition: moneyFormat(checklistsMonth.sums.acquisition),
                    loyalty: moneyFormat(checklistsMonth.sums.loyalty),
                    acquiring: moneyFormat(checklistsMonth.sums.acquiring),
                    businessGrowth: moneyFormat(
                      checklistsMonth.sums.businessGrowth
                    ),
                    financialReserve: moneyFormat(
                      checklistsMonth.sums.financialReserve
                    ),
                    salary: moneyFormat(checklistsMonth.sums.salary),
                    toolEquipment: moneyFormat(
                      checklistsMonth.sums.toolEquipment
                    ),
                    profit: moneyFormat(checklistsMonth.sums.profit),
                    total: moneyFormat(checklistsMonth.sums.total),
                  }
                : undefined
            }
          />
        </>
      ) : (
        <div className={clsx("shadow-container", styles.emptyData)}>
          <p className="text_medium">
            По данному месяцу информация отсутствует
          </p>
          <Button onClick={handleOpenMonthlyPlan}>Открыть месяц</Button>
        </div>
      )}
    </div>
  );
};
