import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Divider } from "@mui/material";
import { FC } from "react";

import { Supplier } from "@entities/supplier";
import {
  useOpenSupplierDeleteModal,
  useOpenSupplierEditModal,
} from "@features/supplier";
import { StackRow } from "@shared/ui";

interface SupplierCardActionsProps {
  supplier: Supplier;
}
export const SupplierCardActions: FC<SupplierCardActionsProps> = ({
  supplier,
}) => {
  const openEdit = useOpenSupplierEditModal();
  const openDelete = useOpenSupplierDeleteModal(true);

  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Divider />
      <StackRow align="end">
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => openEdit(supplier.id)}
        >
          Редактировать
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(supplier.id)}
        >
          Удалить
        </Button>
      </StackRow>
    </Box>
  );
};
