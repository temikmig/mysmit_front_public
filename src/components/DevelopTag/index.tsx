import clsx from "clsx";
import styles from "./DevelopTag.module.css";

export const DevelopTag = () => {
  if (import.meta.env.VITE_APP_ENV === "dev")
    return <div className={clsx(styles.developTapCont, styles.dev)}>DEV</div>;
  if (import.meta.env.VITE_APP_ENV === "demo")
    return <div className={clsx(styles.developTapCont, styles.demo)}>DEMO</div>;

  return;
};
