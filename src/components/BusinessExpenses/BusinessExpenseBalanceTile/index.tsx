import clsx from "clsx";
import styles from "./BusinessExpenseBalanceTile.module.css";
import { moneyFormat } from "../../../common/functions";

interface BusinessExpenseBalanceTileProps {
  title: string;
  balance: number;
  color?: "green" | "red" | "blue";
}

export const BusinessExpenseBalanceTile = ({
  title,
  balance,
  color = "blue",
}: BusinessExpenseBalanceTileProps) => {
  return (
    <div
      className={clsx(
        "shadow-container",
        styles.balanceTileCont,
        styles[color]
      )}
    >
      <p className={styles.balanceValue}>{moneyFormat(balance, 4)}</p>
      <div className={styles.balanceTitleCont}>
        <h5 className={styles.balanceTitle}>{title}</h5>
      </div>
    </div>
  );
};
