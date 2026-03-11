import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import styles from "./ErrorCont.module.css";
import { errorMessages } from "../../lib";

export const ErrorCont = ({ code = "500" }: { code?: string }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorCont}>
        <p className={styles.code}>{code}</p>
        <p className={styles.message}>{errorMessages[code]}</p>
      </div>
      {(code === "403" || code === "404") && (
        <div className={styles.buttonCont}>
          <Button onClick={() => navigate("/products/storage")}>
            Перейти в склад
          </Button>
        </div>
      )}
    </div>
  );
};
