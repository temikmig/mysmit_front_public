import styles from "./ChecklistAnalyticsTable.module.css";
import { RubleIcon } from "../../../assets/icons";
import Input from "../../ui/Input";
import { useEffect } from "react";

interface ChecklistAnalyticsTableProps {
  businessExpenses: number;
  directExpenses: number;
  toolEquipment: number;
  salary: number;
  financialReserve: number;
  businessGrowth: number;
  acquiring: number;
  loyalty: number;
  acquisition: number;
  price: number;
  formSetFieldValue: (key: string, val: number) => void;
  loyaltyDisabled: boolean;
  salaryDisabled: boolean;
}

export const ChecklistAnalyticsTable = ({
  businessExpenses,
  directExpenses,
  toolEquipment,
  salary,
  financialReserve,
  businessGrowth,
  acquiring,
  loyalty,
  acquisition,
  price,
  formSetFieldValue,
  loyaltyDisabled,
  salaryDisabled,
}: ChecklistAnalyticsTableProps) => {
  const analytics = [
    {
      key: "businessExpenses",
      label: "Бизнес-затраты",
      value: businessExpenses,
      disabled: true,
    },
    {
      key: "directExpenses",
      label: "Прямые затраты",
      value: directExpenses,
      disabled: true,
    },
    {
      key: "toolEquipment",
      label: "Инструменты и оборудование",
      value: toolEquipment,
      disabled: true,
    },
    {
      key: "salary",
      label: "Зарплата",
      value: salary,
      disabled: salaryDisabled,
    },
    {
      key: "financialReserve",
      label: "Финансовый резерв",
      value: financialReserve,
    },
    {
      key: "businessGrowth",
      label: "Развитие бизнеса",
      value: businessGrowth,
    },
    {
      key: "acquiring",
      label: "Процент эквайринга",
      value: acquiring,
      disabled: true,
    },
    {
      key: "loyalty",
      label: "Карта лояльности",
      value: loyalty,
      disabled: loyaltyDisabled,
    },
    { key: "acquisition", label: "Привлечение", value: acquisition },
  ];

  const total = analytics.reduce((sum, a) => sum + (a.value || 0), 0);
  const profit = price - total;

  const formatNum = (val: number) =>
    val.toLocaleString("ru-RU", { minimumFractionDigits: 0 });

  useEffect(() => {
    formSetFieldValue("total", total);
    formSetFieldValue("profit", profit);
  }, [total, profit]);

  return (
    <div className="shadow-container">
      <table className={styles.fundsTable}>
        <tbody>
          {analytics.map((analytic) => {
            const val = analytic.value ?? 0;
            const percent =
              price > 0 ? ((val / price) * 100).toFixed(1) : "0.0";

            return (
              <tr key={analytic.key}>
                <td className={styles.fundsTableLabel}>{analytic.label}</td>
                <td className={styles.fundsTableInput}>
                  <Input
                    name={analytic.key}
                    type="number"
                    value={val}
                    disabled={analytic.disabled}
                    onChange={(e) =>
                      formSetFieldValue(analytic.key, Number(e.target.value))
                    }
                    rightIcon={<RubleIcon />}
                    className={val > price ? styles.errorVal : undefined}
                  />
                </td>
                <td className={styles.fundsTablePercent}>{percent}%</td>
              </tr>
            );
          })}
          {price > 0 && (
            <>
              <tr>
                <td className={styles.fundsTableLabel}>
                  <b>Итого</b>
                </td>
                <td className={styles.fundsTableInput}>
                  <Input
                    type="text"
                    value={formatNum(total)}
                    disabled
                    rightIcon={<RubleIcon />}
                    className={total > price ? styles.errorVal : undefined}
                  />
                </td>
                <td className={styles.fundsTablePercent}>
                  {((total / price) * 100).toFixed(1)}%
                </td>
              </tr>

              <tr>
                <td className={styles.fundsTableLabel}>
                  <b>Прибыль</b>
                </td>
                <td className={styles.fundsTableInput}>
                  <Input
                    type="text"
                    value={formatNum(profit)}
                    disabled
                    rightIcon={<RubleIcon />}
                    className={profit < 0 ? styles.errorVal : undefined}
                  />
                </td>
                <td className={styles.fundsTablePercent}>
                  {((profit / price) * 100).toFixed(1)}%
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
