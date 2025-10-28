import clsx from "clsx";
import styles from "./DataGrid.module.css";
import { ReactNode } from "react";
import { IconButton } from "../IconButton";
import { ReloadIcon } from "../../../assets/icons";

export type DataGridItem = {
  title: string;
  description: ReactNode | undefined;
};

interface DataGridProps {
  items: DataGridItem[];
  onReload?: () => void;
}

export const DataGrid = ({ items, onReload }: DataGridProps) => {
  return (
    <div className={styles.dataGrid}>
      {onReload && (
        <div className={styles.reloadButtonCont}>
          <IconButton
            variant="outline"
            icon={<ReloadIcon />}
            onClick={onReload}
          />
        </div>
      )}
      {items.map((item) => (
        <div className={styles.dataGridItem} key={item.title}>
          <p className={clsx("text_medium_bold", styles.dataGridTitle)}>
            {item.title}
          </p>
          <div className={clsx("text_medium", styles.dataGridDescription)}>
            {item.description !== undefined ? (
              item.description
            ) : (
              <p className={clsx("text_medium", styles.empty)}>Не указано</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
