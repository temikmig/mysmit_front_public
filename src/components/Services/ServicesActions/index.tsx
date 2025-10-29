/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadgeIcon, DeleteIcon, EditIcon } from "../../../assets/icons";
import { useModal } from "../../../common/hooks/useModal";
import { ServiceEdit } from "../ServiceEdit";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { Service } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface ServicesActionsProps {
  service: Service;
}

export const ServicesActions = ({ service }: ServicesActionsProps) => {
  const { handleServiceCard, handleServiceEdit, handleServiceDelete } =
    useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleServiceCard(service.id);
        }}
      />
      <TableAction
        tooltip="Редактировать"
        icon={<EditIcon />}
        onClick={() => {
          handleServiceEdit(service.id);
        }}
      />
      <TableAction
        tooltip="Удалить"
        icon={<DeleteIcon />}
        onClick={() => {
          handleServiceDelete(service.id);
        }}
      />
    </TableActionsCont>
  );
};
