import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridActionsColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import {
  useOpenSupplierDeleteModal,
  useOpenSupplierEditModal,
} from "@features/supplier";

export const useSuppliersActionsColumn = () => {
  const openEdit = useOpenSupplierEditModal();
  const openDelete = useOpenSupplierDeleteModal();

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
          key="delete"
          icon={<DeleteForeverIcon />}
          label="Удалить клиента"
          onClick={() => openDelete(params.row.id)}
          showInMenu
        />,
      ],
    }),
    [openEdit, openDelete],
  );

  return { actionsColumn };
};
