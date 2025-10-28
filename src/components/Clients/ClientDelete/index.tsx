import { useDeleteClientMutation, useGetClientQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ClientDelete.module.css";

interface ClientDeleteProps {
  clientId: string;
  onSuccess: () => void;
}

export const ClientDelete = ({ clientId, onSuccess }: ClientDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: client, isLoading } = useGetClientQuery(clientId);

  const [deleteClient, { isLoading: isLoadingDelete }] =
    useDeleteClientMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client) return;

    await deleteClient(clientId)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Клиент ${client.firstName} ${client.lastName} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Клиент ${client.firstName} ${client.lastName} не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  if (isLoading) return <LoaderPage />;

  if (client)
    return (
      <div className={styles.deleteCont}>
        <p className="text_medium">
          Вы действительно хотите удалить клиента {client.firstName}{" "}
          {client.lastName}?
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
