import {
  useDeleteMoneyMovementMutation,
  useGetMoneyMovementQuery,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./MoneyMovementDelete.module.css";

interface MoneyMovementDeleteProps {
  moneyMovementId: string;
  onSuccess: () => void;
}

export const MoneyMovementDelete = ({
  moneyMovementId,
  onSuccess,
}: MoneyMovementDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: moneyMovement, isLoading } =
    useGetMoneyMovementQuery(moneyMovementId);

  const [deleteMovement, { isLoading: isLoadingDelete }] =
    useDeleteMoneyMovementMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!moneyMovement) return;

    await deleteMovement(moneyMovementId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Данное движение успешно удалено из истории`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Данное движение не может быть удалено`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (moneyMovement)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить данное движение из истории?
        </p>
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button onClick={handleSubmit} disabled={isLoadingDelete}>
            Удалить
          </Button>
        </div>
        <LoaderBlur isLoading={isLoadingDelete} />
      </div>
    );
};
