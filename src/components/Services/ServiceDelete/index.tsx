import { useDeleteServiceMutation, useGetServiceQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ServiceDelete.module.css";

interface ServiceDeleteProps {
  serviceId: number;
  onSuccess: () => void;
}

export const ServiceDelete = ({ serviceId, onSuccess }: ServiceDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: service, isLoading } = useGetServiceQuery(serviceId);

  const [deleteService, { isLoading: isLoadingDelete }] =
    useDeleteServiceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    await deleteService(serviceId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Услуга ${service.name} успешно удалена`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Услуга ${service.name} не может быть удалена`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (service)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить услугу {service.name}?
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
