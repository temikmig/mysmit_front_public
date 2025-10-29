/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadgeIcon, DeleteIcon, EditIcon } from "../../../assets/icons";
import { useModal } from "../../../common/hooks/useModal";
import { SupplierEdit } from "../SupplierEdit";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { Supplier } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface ServicesActionsProps {
  supplier: Supplier;
}

export const SuppliersActions = ({ supplier }: ServicesActionsProps) => {
  const { handleSupplierCard, handleSupplierEdit, handleSupplierDelete } =
    useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleSupplierCard(supplier.id);
        }}
      />
      <TableAction
        tooltip="Редактировать"
        icon={<EditIcon />}
        onClick={() => {
          handleSupplierEdit(supplier.id);
        }}
      />
      <TableAction
        tooltip="Удалить"
        icon={<DeleteIcon />}
        onClick={() => {
          handleSupplierDelete(supplier.id);
        }}
      />
    </TableActionsCont>
  );
};
