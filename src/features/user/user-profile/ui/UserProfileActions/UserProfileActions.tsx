import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyIcon from "@mui/icons-material/Key";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Divider } from "@mui/material";
import { FC } from "react";

import { User, useUserPermissions } from "@entities/user";
import {
  useOpenUserDeleteModal,
  useOpenUserEditModal,
  useOpenUserPasswordModal,
} from "@features/user";
import { StackRow } from "@shared/ui";

interface UserProfileActionsProps {
  user: User;
}
export const UserProfileActions: FC<UserProfileActionsProps> = ({ user }) => {
  const { canEdit, canDelete, canChangePassword } = useUserPermissions(user);

  const openEdit = useOpenUserEditModal();
  const openPassword = useOpenUserPasswordModal();
  const openDelete = useOpenUserDeleteModal(true);

  return (
    <>
      <Divider />
      <StackRow align="end">
        {canEdit && (
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => openEdit(user.id)}
          >
            Редактировать
          </Button>
        )}
        {canChangePassword && (
          <Button
            variant="outlined"
            startIcon={<KeyIcon />}
            onClick={() => openPassword(user.id)}
          >
            Сменить пароль
          </Button>
        )}
        {canDelete && (
          <Button
            variant="outlined"
            startIcon={<DeleteForeverIcon />}
            onClick={() => openDelete(user.id)}
          >
            Удалить
          </Button>
        )}
      </StackRow>
    </>
  );
};
