import { ApiError } from "../../../api/baseQuery";
import { useDeleteUserMutation, useGetUserQuery } from "../../../api/usersApi";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./UserDelete.module.css";

interface UserDeleteProps {
  userId: string;
  onSuccess: () => void;
}

export const UserDelete = ({ userId, onSuccess }: UserDeleteProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId);

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    await deleteUser(user.id)
      .unwrap()
      .then(() => {
        onSuccess?.();
        showSnackbar({
          title: "Сообщение",
          message: `Сотрудник ${user.firstName} ${user.lastName} успешно удален`,
          mode: "success",
        });
      })
      .catch((err) => {
        const error = err as ApiError;
        showSnackbar({
          title: "Ошибка",
          message: `Сотрудник ${user.firstName} ${user.lastName} не может быть удален`,
          addMessage: error.data.msg,
          mode: "error",
        });
      });
  };

  const isLoading = isLoadingUser || isLoadingDelete;

  if (isLoading) return <LoaderPage />;

  if (user)
    return (
      <div className={styles.userDeleteCont}>
        <h4>Подтвердите удаление</h4>
        <p className="text_medium">
          Вы действительно хотите удалить работника {user.firstName}
          {user.lastName}?
        </p>
        <div className={styles.buttonsCont}>
          <Button variant="secondary" onClick={onSuccess}>
            Отмена
          </Button>

          <Button onClick={handleSubmit} disabled={isLoadingDelete}>
            Удалить
          </Button>
        </div>
      </div>
    );
};
