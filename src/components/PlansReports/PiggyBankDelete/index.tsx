import { useDeletePiggyBankMutation, useGetPiggyBankQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./PiggyBankDelete.module.css";

interface PiggyBankDeleteProps {
  piggyBankId: string;
  onSuccess: () => void;
}

export const PiggyBankDelete = ({
  piggyBankId,
  onSuccess,
}: PiggyBankDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: piggyBank, isLoading } = useGetPiggyBankQuery(piggyBankId);

  const [deletePiggyBank, { isLoading: isLoadingDelete }] =
    useDeletePiggyBankMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!piggyBank) return;

    await deletePiggyBank(piggyBankId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Копилка ${piggyBank.name} успешно удалена`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Копилка ${piggyBank.name} не может быть удалена`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (piggyBank)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить копилку "{piggyBank.name}"?
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
