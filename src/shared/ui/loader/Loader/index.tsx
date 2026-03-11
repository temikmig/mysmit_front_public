import { CircularProgress, Typography } from "@mui/material";

import styles from "./Loader.module.css";

interface LoaderProps {
  fullscreen?: boolean;
  text?: boolean;
}

export const Loader = ({ fullscreen = false, text = false }: LoaderProps) => {
  const loader = (
    <div className={styles.loader}>
      <CircularProgress />
      {text && <Typography>Загрузка</Typography>}
    </div>
  );

  return fullscreen ? (
    <div className={styles.loaderScreen}>{loader}</div>
  ) : (
    loader
  );
};
