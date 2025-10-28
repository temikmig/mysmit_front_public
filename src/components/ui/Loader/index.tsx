import clsx from "clsx";
import styles from "./Loader.module.css";

interface LoaderProps {
  fullscreen?: boolean;
  text?: boolean;
}

export const Loader = ({ fullscreen = false, text = false }: LoaderProps) => {
  const loader = (
    <div className={styles.loader}>
      <div className={styles.dotLoader}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      {text && (
        <p className={clsx(styles.loaderText, "text_medium")}>Загрузка</p>
      )}
    </div>
  );

  return fullscreen ? (
    <div className={styles.loaderScreen}>{loader}</div>
  ) : (
    loader
  );
};
