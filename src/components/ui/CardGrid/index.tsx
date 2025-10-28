import type { ReactNode } from "react";
import styles from "./CardGrid.module.css";

interface CardGridProps {
  children: ReactNode;
}

export const CardGrid = ({ children }: CardGridProps) => {
  return <div className={styles.cardGrid}>{children}</div>;
};
