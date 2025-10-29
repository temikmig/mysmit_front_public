/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadgeIcon, DeleteIcon, EditIcon } from "../../../assets/icons";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { ClientSource, Supplier } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface ClientSourcesActionsProps {
  clientSource: ClientSource;
}

export const ClientSourcesActions = ({
  clientSource,
}: ClientSourcesActionsProps) => {
  const {
    handleClientSourceEdit,
    handleClientSourceCard,
    handleClientSourceDelete,
  } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleClientSourceCard(clientSource.id);
        }}
      />
      <TableAction
        tooltip="Редактировать"
        icon={<EditIcon />}
        onClick={() => {
          handleClientSourceEdit(clientSource.id);
        }}
      />
      <TableAction
        tooltip="Удалить"
        icon={<DeleteIcon />}
        onClick={() => {
          handleClientSourceDelete(clientSource.id);
        }}
      />
    </TableActionsCont>
  );
};
