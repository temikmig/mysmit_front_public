import { moneyFormat, roundUp } from "../../../common/functions";
import styles from "./ChecklistFundsDataTable.module.css";

interface ChecklistFundsDataTableProps {
  data: {
    label: string;
    value: number;
  }[];
  total: number;
  profit: number;
  price: number;
}

export const ChecklistFundsDataTable = ({
  data,
  total,
  profit,
  price,
}: ChecklistFundsDataTableProps) => {
  if (data)
    return (
      <div className="shadow-container">
        <table className={styles.fundsTable}>
          <thead>
            <tr>
              <th colSpan={3}>Итоговые затраты на услугу</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.label}>
                  <td className={styles.fundsTableLabel}>{item.label}</td>
                  <td className={styles.fundsTableValue}>
                    {moneyFormat(item.value)}
                  </td>
                  <td className={styles.fundsTablePercent}>
                    {`${roundUp((item.value / price) * 100)}%`}
                  </td>
                </tr>
              );
            })}
            <tr className={styles.totalLabel}>
              <td className={styles.fundsTableLabel}>Итого</td>
              <td className={styles.fundsTableValue}>{moneyFormat(total)}</td>
              <td className={styles.fundsTablePercent}>
                {`${roundUp((total / price) * 100)}%`}
              </td>
            </tr>
            <tr className={styles.totalLabel}>
              <td className={styles.fundsTableLabel}>Прибыль</td>
              <td className={styles.fundsTableValue}>{moneyFormat(profit)}</td>
              <td className={styles.fundsTablePercent}>
                {`${roundUp((profit / price) * 100)}%`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};
