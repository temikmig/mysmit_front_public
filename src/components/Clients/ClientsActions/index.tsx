/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadgeIcon, DeleteIcon, EditIcon } from "../../../assets/icons";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { Client } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface ServicesActionsProps {
  client: Client;
  refetch: () => void;
}

export const ClientsActions = ({ client, refetch }: ServicesActionsProps) => {
  const { handleClientCard, handleClientEdit, handleClientDelete } =
    useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleClientCard(client.id);
        }}
      />
      <TableAction
        tooltip="Редактировать"
        icon={<EditIcon />}
        onClick={() => {
          handleClientEdit(client.id, refetch);
        }}
      />
      <TableAction
        tooltip="Удалить"
        icon={<DeleteIcon />}
        onClick={() => {
          handleClientDelete(client.id, refetch);
        }}
      />
    </TableActionsCont>
  );
};
