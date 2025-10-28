import clsx from "clsx";
import styles from "./InventoryDiffWrap.module.css";

interface InventoryDiffWrapProps {
  diff: number;
  diffLabel: string;
  min?: boolean;
}

export const InventoryDiffWrap = ({
  diff,
  diffLabel,
  min = false,
}: InventoryDiffWrapProps) => {
  return (
    <p
      className={clsx(
        styles.diff,
        min ? "text_small_bold" : "text_medium_bold",
        diff === 0
          ? styles.diffOk
          : diff > 0
          ? styles.diffOver
          : styles.diffUnder
      )}
    >
      {`${diff > 0 ? `+${diff}` : diff} ${diffLabel}`}
    </p>
  );
};
