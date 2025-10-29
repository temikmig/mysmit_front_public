/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadgeIcon } from "../../../assets/icons";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { Inventory } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface InventoryActionsProps {
  inventory: Inventory;
}

export const InventoryActions = ({ inventory }: InventoryActionsProps) => {
  const { handleInventoryCard } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleInventoryCard(inventory.id);
        }}
      />
    </TableActionsCont>
  );
};
