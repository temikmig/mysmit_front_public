import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Divider } from "@mui/material";
import { FC } from "react";

import { ClientSource } from "@entities/clientSource";
import {
  useOpenClientSourceDeleteModal,
  useOpenClientSourceEditModal,
} from "@features/client-source";
import { StackRow } from "@shared/ui";

interface ClientSourceCardActionsProps {
  clientSource: ClientSource;
}
export const ClientSourceCardActions: FC<ClientSourceCardActionsProps> = ({
  clientSource,
}) => {
  const openEdit = useOpenClientSourceEditModal();
  const openDelete = useOpenClientSourceDeleteModal(true);

  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Divider />
      <StackRow align="end">
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => openEdit(clientSource.id)}
        >
          Редактировать
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(clientSource.id)}
        >
          Удалить
        </Button>
      </StackRow>
    </Box>
  );
};
