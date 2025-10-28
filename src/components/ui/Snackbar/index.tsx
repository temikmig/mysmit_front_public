import {
  AttentionIcon,
  CrossCircleIcon,
  CrossSmallIcon,
  SuccessIcon,
} from "../../../assets/icons";
import type { SnackbarData } from "../../../common/contexts/Snackbar/types";

import styles from "./Snackbar.module.css";
import clsx from "clsx";

interface SnackbarProps extends SnackbarData {
  onClose: () => void;
}

export const Snackbar = ({
  title,
  message,
  addMessage,
  mode,
  onClose,
}: SnackbarProps) => {
  return (
    <div
      className={clsx(styles.snackbarCont, styles[mode], "shadow-container")}
    >
      <div className={styles.snackbarHead}>
        {mode === "error" && <CrossCircleIcon />}
        {(mode === "attention" || mode === "info") && <AttentionIcon />}
        {mode === "success" && <SuccessIcon />}
        <p className="text_medium_bold">{title}</p>
      </div>

      <p className="text_small">{message}</p>
      {addMessage && <p className="text_small">{addMessage}</p>}
      <button className={styles.closeSnackbar} onClick={onClose}>
        <CrossSmallIcon />
      </button>
    </div>
  );
};
