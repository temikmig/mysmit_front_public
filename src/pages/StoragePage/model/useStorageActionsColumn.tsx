import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridActionsColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { useAuth } from "@features/auth";
import {
  useOpenProductDeleteModal,
  useOpenProductEditModal,
} from "@features/product";

export const useStorageActionsColumn = () => {
  const { isAdmin } = useAuth();

  const openEdit = useOpenProductEditModal();
  const openDelete = useOpenProductDeleteModal();

  const actionsColumn: GridActionsColDef = useMemo(
    () => ({
      field: "actions",
      type: "actions",
      width: 60,
      resizable: false,
      getActions: (params) =>
        isAdmin
          ? [
              <GridActionsCellItem
                key="edit"
                icon={<EditIcon />}
                label="Редактировать"
                onClick={() => openEdit(params.row.id)}
                showInMenu
              />,
              <GridActionsCellItem
                key="delete"
                icon={<DeleteForeverIcon />}
                label="Удалить товар"
                onClick={() => openDelete(params.row.id)}
                showInMenu
              />,
            ]
          : [],
    }),
    [openEdit, openDelete],
  );

  return { actionsColumn };
};
