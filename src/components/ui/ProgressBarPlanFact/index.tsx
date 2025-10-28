import React from "react";
import styles from "./ProgressBarPlanFact.module.css";
import clsx from "clsx";

interface ProgressBarPlanFactProps {
  plan: number;
  fact: number;
}

export const ProgressBarPlanFact: React.FC<ProgressBarPlanFactProps> = ({
  plan,
  fact,
}) => {
  const factPercent = Math.min((fact / plan) * 100, 100);

  return (
    <div className={styles.progressBarCont}>
      <div className={styles.planBar} />
      <div
        className={clsx(styles.factBar, factPercent === 100 && styles.complete)}
        style={{ width: `${factPercent}%` }}
      />
    </div>
  );
};
