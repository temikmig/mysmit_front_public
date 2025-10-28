import { type User } from "../../../common/types";
import {
  BadgeIcon,
  DeleteIcon,
  EditIcon,
  KeyIcon,
} from "../../../assets/icons";
import { useAuth } from "../../../common/hooks/useAuth";
import { useDeleteUserMutation } from "../../../api/usersApi";
import { TableAction, TableActionsCont } from "../../ui/TableActions";
import { useHandlers } from "../../../common/hooks";

interface UsersActionsProps {
  user: User;
  refetch: () => void;
}

export const UsersActions = ({ user, refetch }: UsersActionsProps) => {
  const { user: userMe } = useAuth();

  useDeleteUserMutation();

  const {
    handleUserEdit,
    handleUserEditPassword,
    handleUserDelete,
    handleUserCard,
  } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleUserCard(user.id);
        }}
      />
      <TableAction
        tooltip={userMe?.id !== user.id ? "Редактировать" : undefined}
        icon={<EditIcon />}
        onClick={() => {
          handleUserEdit(user.id, refetch);
        }}
      />
      <TableAction
        tooltip="Изменить пароль"
        icon={<KeyIcon />}
        onClick={() => {
          handleUserEditPassword(user.id);
        }}
      />
      <TableAction
        tooltip={userMe?.id !== user.id ? "Удалить" : undefined}
        icon={<DeleteIcon />}
        onClick={() => {
          handleUserDelete(user.id, refetch);
        }}
      />
    </TableActionsCont>
  );
};
