import clsx from "clsx";
import styles from "./Alert.module.css";
import {
  AttentionIcon,
  CrossCircleIcon,
  SuccessIcon,
} from "../../../assets/icons";

interface AlertProps {
  title: string;
  description?: string;
  mode: "success" | "error" | "attention";
}

export const Alert = ({ title, description, mode }: AlertProps) => {
  return (
    <div className={clsx(styles.alertCont, styles[mode], "shadow-container")}>
      {mode === "error" && <CrossCircleIcon color="var(--icons-red)" />}
      {mode === "attention" && <AttentionIcon color="var(--icons-orange)" />}
      {mode === "success" && <SuccessIcon color="var(--icons-green)" />}
      <div className={styles.alertWrap}>
        <h4>{title}</h4>

        {description && <p className="text_medium">{description}</p>}
      </div>
    </div>
  );
};
