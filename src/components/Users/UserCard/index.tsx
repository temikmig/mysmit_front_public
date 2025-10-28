import { useGetUserQuery } from "../../../api/usersApi";
import { EditIcon, KeyIcon } from "../../../assets/icons";
import { useAuth, useHandlers } from "../../../common/hooks";
import Button from "../../ui/Button";
import { DataGridItem, DataGrid } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";
import { UserAvatar } from "../UserAvatar";
import { UserRoleTag } from "../UserRoleTag";

import styles from "./UserCard.module.css";

interface UserCardProps {
  userId: string;
}

export const UserCard = ({ userId }: UserCardProps) => {
  const { data: user, isLoading } = useGetUserQuery(userId);
  const { user: userMe, isAdmin } = useAuth();

  const { handleUserEdit, handleUserEditPassword } = useHandlers();

  const userItems: DataGridItem[] =
    (user && [
      {
        title: "Логин",
        description: user.login,
      },
      {
        title: "Имя",
        description: user.firstName,
      },
      {
        title: "Фамилия",
        description: user.lastName,
      },
      {
        title: "Роль",
        description: <UserRoleTag min role={user.role} />,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (user)
    return (
      <div className={styles.userCardCont}>
        <UserAvatar user={user} size={162} />
        <div className={styles.userDataCont}>
          <h4>Карточка пользователя</h4>
          <DataGrid items={userItems} />
          {isAdmin && userMe?.id !== user.id && (
            <div className={styles.buttonsCont}>
              <Button
                icon={<KeyIcon />}
                onClick={() => {
                  handleUserEditPassword(userId);
                }}
              >
                Сменить пароль
              </Button>
              <Button
                icon={<EditIcon />}
                onClick={() => {
                  handleUserEdit(userId);
                }}
              >
                Редактировать
              </Button>
            </div>
          )}
        </div>
      </div>
    );
};
