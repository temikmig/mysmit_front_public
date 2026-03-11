import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetUsersListQuery, User } from "@entities/user";
import {
  useOpenUserCreateModal,
  useOpenUserProfileModal,
} from "@features/user";
import { TablePage } from "@widgets/table-page";

import { useUsersActionsColumn, useUsersColumn } from "./model";

export const UsersPage = () => {
  const { userId } = useParams();

  const createUser = useOpenUserCreateModal();
  const openUserProfileModal = useOpenUserProfileModal();

  const { columns } = useUsersColumn();
  const { actionsColumn } = useUsersActionsColumn();

  useEffect(() => {
    if (!userId) return;

    openUserProfileModal(userId, false);
  }, []);

  return (
    <TablePage<User>
      pageTitle="Пользователи"
      query={useGetUsersListQuery}
      columns={[...columns, actionsColumn]}
      actions={[
        {
          icon: <Add />,
          title: "Добавить пользователя",
          onClick: createUser,
        },
      ]}
    />
  );
};
