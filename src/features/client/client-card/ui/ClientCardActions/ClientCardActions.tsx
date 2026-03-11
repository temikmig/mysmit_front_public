import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Divider } from "@mui/material";
import { FC } from "react";

import { Client } from "@entities/client";
import {
  useOpenClientDeleteModal,
  useOpenClientEditModal,
} from "@features/client";
import { StackRow } from "@shared/ui";

interface ClientCardActionsProps {
  client: Client;
}
export const ClientCardActions: FC<ClientCardActionsProps> = ({ client }) => {
  const openEdit = useOpenClientEditModal();
  const openDelete = useOpenClientDeleteModal(true);

  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Divider />
      <StackRow align="end">
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => openEdit(client.id)}
        >
          Редактировать
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(client.id)}
        >
          Удалить
        </Button>
      </StackRow>
    </Box>
  );
};
