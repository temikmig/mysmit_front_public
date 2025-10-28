import LoaderPage from "../LoaderPage";

import styles from "./LoaderBlur.module.css";

interface LoaderBlurProps {
  isLoading: boolean;
}

export const LoaderBlur = ({ isLoading }: LoaderBlurProps) => {
  if (isLoading)
    return (
      <div className={styles.loaderBlurCont}>
        <LoaderPage />
      </div>
    );

  return null;
};
