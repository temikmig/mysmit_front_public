import {
  useDeleteClientSourceMutation,
  useGetClientSourceQuery,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ClientSourceDelete.module.css";

interface ClientSourceDeleteProps {
  clientSourceId: string;
  onSuccess: () => void;
}

export const ClientSourceDelete = ({
  clientSourceId,
  onSuccess,
}: ClientSourceDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: clientSource, isLoading } =
    useGetClientSourceQuery(clientSourceId);

  const [deleteClientSource, { isLoading: isLoadingDelete }] =
    useDeleteClientSourceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientSource) return;

    await deleteClientSource(clientSourceId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Источник ${clientSource.name} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Источник не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (clientSource)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить источник "{clientSource.name}"?
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
