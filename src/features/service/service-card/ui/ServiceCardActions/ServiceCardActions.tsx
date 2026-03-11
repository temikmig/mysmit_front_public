import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Divider } from "@mui/material";
import { FC } from "react";

import { Service } from "@entities/service";
import {
  useOpenServiceDeleteModal,
  useOpenServiceEditModal,
} from "@features/service";
import { StackRow } from "@shared/ui";

interface ServiceCardActionsProps {
  service: Service;
}
export const ServiceCardActions: FC<ServiceCardActionsProps> = ({
  service,
}) => {
  const openEdit = useOpenServiceEditModal();
  const openDelete = useOpenServiceDeleteModal(true);

  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Divider />
      <StackRow align="end">
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => openEdit(service.id)}
        >
          Редактировать
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(service.id)}
        >
          Удалить
        </Button>
      </StackRow>
    </Box>
  );
};
