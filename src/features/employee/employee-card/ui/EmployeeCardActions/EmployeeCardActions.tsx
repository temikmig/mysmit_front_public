import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Divider } from "@mui/material";
import { FC } from "react";

import { Employee } from "@entities/employee";
import {
  useOpenEmployeeDeleteModal,
  useOpenEmployeeEditModal,
} from "@features/employee";
import { StackRow } from "@shared/ui";

interface EmployeeCardActionsProps {
  employee: Employee;
}
export const EmployeeCardActions: FC<EmployeeCardActionsProps> = ({
  employee,
}) => {
  const openEdit = useOpenEmployeeEditModal();
  const openDelete = useOpenEmployeeDeleteModal(true);

  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Divider />
      <StackRow align="end">
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => openEdit(employee.id)}
        >
          Редактировать
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(employee.id)}
        >
          Удалить
        </Button>
      </StackRow>
    </Box>
  );
};
