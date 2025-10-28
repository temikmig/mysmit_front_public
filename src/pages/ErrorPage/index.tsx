import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import Button from "../../components/ui/Button";

const errorMessages: Record<string, string> = {
  "403": "Доступ запрещён",
  "404": "Страница не найдена",
  "500": "Внутренняя ошибка сервера",
};

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
          <Button
            variant="secondary"
            onClick={() => navigate("/products/storage")}
          >
            Перейти в склад
          </Button>
        </div>
      )}
    </div>
  );
};

export const ErrorPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code || !errorMessages[code]) {
      navigate("/error/404", { replace: true });
    }
  }, [code, navigate]);

  if (!code || !errorMessages[code]) return null;

  return <ErrorCont code={code} />;
};
