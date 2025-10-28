import { useDeleteClientCarMutation, useGetClientCarQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ClientCarDelete.module.css";

interface ClientCarDeleteProps {
  carId: string;
  onSuccess: () => void;
}

export const ClientCarDelete = ({ carId, onSuccess }: ClientCarDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: car, isLoading } = useGetClientCarQuery(carId);

  const [deleteClientCar, { isLoading: isLoadingDelete }] =
    useDeleteClientCarMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car) return;

    await deleteClientCar(carId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Автомобиль ${car.mark} ${car.model} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Автомобиль ${car.mark} ${car.model} не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (car)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить автомобиль{" "}
          {`${car.mark} ${car.model}${car.number ? ` (${car.number})` : ``}`}?
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
