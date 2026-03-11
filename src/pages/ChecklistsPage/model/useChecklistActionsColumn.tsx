import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridActionsColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { useAuth } from "@features/auth";
import {
  useOpenChecklistEditModal,
  useOpenChecklistDeleteModal,
} from "@features/checklist";

export const useChecklistActionsColumn = () => {
  const { isAdmin, user } = useAuth();

  const openEdit = useOpenChecklistEditModal();
  const openDelete = useOpenChecklistDeleteModal();

  const actionsColumn: GridActionsColDef = useMemo(
    () => ({
      field: "actions",
      type: "actions",
      width: 60,
      resizable: false,
      getActions: (params) =>
        params.row.status === "AWAITING_SENIOR" ||
        (params.row.status === "AWAITING_MANAGER" &&
          user?.role === "SENIOR_WORKER") ||
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
                label="Удалить чек-лист"
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
