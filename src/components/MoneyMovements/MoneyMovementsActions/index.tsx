import { DeleteIcon, EditIcon } from "../../../assets/icons";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { MoneyMovement } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface MoneyMovementsActionsProps {
  moneyMovement: MoneyMovement;
}

export const MoneyMovementsActions = ({
  moneyMovement,
}: MoneyMovementsActionsProps) => {
  const { handleMoneyMovementEdit, handleMoneyMovementDelete } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Редактировать"
        icon={<EditIcon />}
        onClick={() => {
          handleMoneyMovementEdit(moneyMovement.id);
        }}
      />
      <TableAction
        tooltip="Удалить"
        icon={<DeleteIcon />}
        onClick={() => {
          handleMoneyMovementDelete(moneyMovement.id);
        }}
      />
    </TableActionsCont>
  );
};
