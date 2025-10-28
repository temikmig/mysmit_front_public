import { useEffect, useState } from "react";
import { AngleLeftIcon, AngleRightIcon, PlusMinIcon } from "../../assets/icons";
import Button from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import styles from "./ReportsPage.module.css";
import { useGetChecklistStatsQuery } from "../../api";
import LoaderPage from "../../components/ui/LoaderPage";
import { ServiceSelector } from "../../components/Selectors";
import { useHandlers } from "../../common/hooks";
import { DatePicker } from "../../components/ui/DatePicker";
import { moneyFormat } from "../../common/functions";
import clsx from "clsx";

export const ReportsModeEnum = {
  MONTH: "MONTH",
  THREE_MONTH: "THREE_MONTH",
  SIX_MONTH: "SIX_MONTH",
  YEAR: "YEAR",
  ALL_TIME: "ALL_TIME",
  CUSTOM: "CUSTOM",
} as const;

export type ReportsMode =
  (typeof ReportsModeEnum)[keyof typeof ReportsModeEnum];

export const ReportsPage = () => {
  const [reportsMode, setReportsMode] = useState<ReportsMode>("MONTH");
  const [serviceId, setServiceId] = useState<number>(0);

  const { handleServiceAdd } = useHandlers();

  const now = new Date();
  const [periodStart, setPeriodStart] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const [periodEnd, setPeriodEnd] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth() + 1, 0)
  );

  const handlePeriodStart = (value: Date | null) => {
    setPeriodStart(value || new Date());
  };

  const handlePeriodEnd = (value: Date | null) => {
    setPeriodEnd(value || new Date());
  };

  const adjustPeriod = (direction: "prev" | "next") => {
    let months = 1;
    if (reportsMode === ReportsModeEnum.THREE_MONTH) months = 3;
    if (reportsMode === ReportsModeEnum.SIX_MONTH) months = 6;
    if (reportsMode === ReportsModeEnum.YEAR) months = 12;

    const delta = direction === "prev" ? -months : months;

    const newStart = new Date(
      periodStart.getFullYear(),
      periodStart.getMonth() + delta,
      1
    );
    const newEnd =
      reportsMode === ReportsModeEnum.YEAR
        ? new Date(periodEnd.getFullYear() + delta / 12, 11, 31)
        : new Date(
            periodEnd.getFullYear(),
            periodEnd.getMonth() + delta + 1,
            0
          );

    setPeriodStart(newStart);
    setPeriodEnd(newEnd);

    if (reportsMode === ReportsModeEnum.ALL_TIME) {
      setPeriodStart(newStart);
      setPeriodEnd(newEnd);
    }
  };

  const periodLabel = () => {
    const monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    if (reportsMode === ReportsModeEnum.MONTH) {
      return `${
        monthNames[periodStart.getMonth()]
      } ${periodStart.getFullYear()}`;
    } else if (
      reportsMode === ReportsModeEnum.THREE_MONTH ||
      reportsMode === ReportsModeEnum.SIX_MONTH ||
      reportsMode === ReportsModeEnum.YEAR
    ) {
      return `${
        monthNames[periodStart.getMonth()]
      } ${periodStart.getFullYear()} - ${
        monthNames[periodEnd.getMonth()]
      } ${periodEnd.getFullYear()}`;
    } else {
      return `${periodStart.getDate().toString().padStart(2, "0")}.${(
        periodStart.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${periodStart.getFullYear()} - ${periodEnd
        .getDate()
        .toString()
        .padStart(2, "0")}.${(periodEnd.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${periodEnd.getFullYear()}`;
    }
  };

  const dateFrom = periodStart.toISOString();
  const dateTo = periodEnd.toISOString();

  const { data, isLoading, refetch } = useGetChecklistStatsQuery({
    dateFrom: reportsMode === ReportsModeEnum.ALL_TIME ? undefined : dateFrom,
    dateTo: reportsMode === ReportsModeEnum.ALL_TIME ? undefined : dateTo,
    serviceId: serviceId !== 0 ? serviceId : undefined,
  });

  useEffect(() => {
    refetch();
  }, [serviceId, dateFrom, dateTo, refetch, reportsMode]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.reportsCont}>
      <div className={styles.reportsOptions}>
        {reportsMode !== ReportsModeEnum.CUSTOM && (
          <div className={styles.reportsOptionsChangeDateCont}>
            {reportsMode !== ReportsModeEnum.ALL_TIME && (
              <>
                <Button
                  variant="secondary"
                  icon={<AngleLeftIcon />}
                  onClick={() => adjustPeriod("prev")}
                />
                <Button>{periodLabel()}</Button>
                <Button
                  variant="secondary"
                  icon={<AngleRightIcon />}
                  onClick={() => adjustPeriod("next")}
                />
              </>
            )}
          </div>
        )}
        {reportsMode === ReportsModeEnum.CUSTOM && (
          <div className={styles.reportsOptionsChangeDateCont}>
            <DatePicker
              value={periodStart}
              onChange={handlePeriodStart}
              label="С"
              className={styles.reportsOptionsChangeDate}
            />
            <DatePicker
              value={periodEnd}
              onChange={handlePeriodEnd}
              label="По"
              className={styles.reportsOptionsChangeDate}
            />
          </div>
        )}
        <Select
          value={reportsMode}
          options={[
            { label: "За месяц", value: ReportsModeEnum.MONTH },
            { label: "За три месяца", value: ReportsModeEnum.THREE_MONTH },
            { label: "За полгода", value: ReportsModeEnum.SIX_MONTH },
            { label: "За год", value: ReportsModeEnum.YEAR },
            { label: "За все время", value: ReportsModeEnum.ALL_TIME },
            { label: "За период", value: ReportsModeEnum.CUSTOM },
          ]}
          onChange={(val) => {
            setReportsMode(val as ReportsMode);

            const now = new Date();
            if (val === ReportsModeEnum.MONTH) {
              setPeriodStart(new Date(now.getFullYear(), now.getMonth(), 1));
              setPeriodEnd(new Date(now.getFullYear(), now.getMonth() + 1, 0));
            } else if (val === ReportsModeEnum.THREE_MONTH) {
              setPeriodStart(
                new Date(now.getFullYear(), now.getMonth() - 2, 1)
              );
              setPeriodEnd(new Date(now.getFullYear(), now.getMonth() + 1, 0));
            } else if (val === ReportsModeEnum.SIX_MONTH) {
              setPeriodStart(
                new Date(now.getFullYear(), now.getMonth() - 5, 1)
              );
              setPeriodEnd(new Date(now.getFullYear(), now.getMonth() + 1, 0));
            } else if (val === ReportsModeEnum.YEAR) {
              setPeriodStart(new Date(now.getFullYear(), 0, 1));
              setPeriodEnd(new Date(now.getFullYear(), 11, 31));
            }
          }}
          className={styles.reportsOptionsChangeInterval}
        />
        <div className={styles.reportsOptionsChangeService}>
          <ServiceSelector
            mode="single"
            value={serviceId}
            onChange={(val) => setServiceId(Number(val))}
            actions={[
              {
                label: "Добавить услугу",
                icon: <PlusMinIcon />,
                onClick: (currentInput) =>
                  handleServiceAdd(undefined, currentInput as string),
              },
            ]}
          />
        </div>
      </div>

      <div className={styles.reportsContent}>
        {!data ? (
          <p>Нет данных за выбранный период</p>
        ) : (
          <table className={styles.reportsTable}>
            <thead>
              <tr>
                <th>Показатель</th>
                <th className={styles.qty}>Сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Количество чеклистов</td>
                <td className={styles.qty}>{data.totalChecklists}</td>
              </tr>
              <tr>
                <td>Общая сумма</td>
                <td className={styles.qty}>{moneyFormat(data.price)}</td>
              </tr>
              <tr>
                <td>Списание лояльности</td>
                <td className={styles.qty}>
                  {moneyFormat(data.loyaltyWriteOff)}
                </td>
              </tr>
              <tr>
                <td>Бизнес-затраты</td>
                <td className={styles.qty}>
                  {moneyFormat(data.businessExpenses)}
                </td>
              </tr>
              <tr>
                <td>Прямые затраты</td>
                <td className={styles.qty}>
                  {moneyFormat(data.directExpenses)}
                </td>
              </tr>
              <tr>
                <td>Инструменты и оборудование</td>
                <td className={styles.qty}>
                  {moneyFormat(data.toolEquipment)}
                </td>
              </tr>
              <tr>
                <td>Эквайринг</td>
                <td className={styles.qty}>{moneyFormat(data.acquiring)}</td>
              </tr>

              {data.funds?.length > 0 && (
                <>
                  <tr>
                    <td className={styles.reportsFundsHeader}>Фонды</td>
                    <td className={clsx(styles.reportsFundsHeader, styles.qty)}>
                      Сумма
                    </td>
                  </tr>
                  {data.funds.map((fund) => (
                    <tr key={fund.name}>
                      <td>{fund.name}</td>
                      <td className={styles.qty}>{moneyFormat(fund.amount)}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
