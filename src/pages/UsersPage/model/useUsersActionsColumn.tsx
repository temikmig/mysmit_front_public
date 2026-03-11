import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import { GridActionsCellItem, GridActionsColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import {
  useOpenUserEditModal,
  useOpenUserPasswordModal,
  useOpenUserDeleteModal,
} from "@features/user";

export const useUsersActionsColumn = () => {
  const openEdit = useOpenUserEditModal();
  const openPassword = useOpenUserPasswordModal();
  const openDelete = useOpenUserDeleteModal();

  const actionsColumn: GridActionsColDef = useMemo(
    () => ({
      field: "actions",
      type: "actions",
      width: 60,
      resizable: false,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Редактировать"
          onClick={() => openEdit(params.row.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="password"
          icon={<KeyIcon />}
          label="Сменить пароль"
          onClick={() => openPassword(params.row.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteForeverIcon />}
          label="Удалить пользователя"
          onClick={() => openDelete(params.row.id)}
          showInMenu
        />,
      ],
    }),
    [openEdit, openPassword, openDelete],
  );

  return { actionsColumn };
};
