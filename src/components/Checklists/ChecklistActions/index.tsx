import { ChecklistStatusEnum, type Checklist } from "../../../common/types";
import { BadgeIcon, CrossCircleIcon } from "../../../assets/icons";
import { TableAction, TableActionsCont } from "../../ui/TableActions";
import { useHandlers } from "../../../common/hooks";

interface ChecklistActionsProps {
  checklist: Checklist;
}

export const ChecklistActions = ({ checklist }: ChecklistActionsProps) => {
  const { handleChecklistCard, handleChecklistInvalid } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Открыть чек-лист"
        icon={<BadgeIcon />}
        onClick={() => {
          handleChecklistCard(checklist.id);
        }}
      />
      <TableAction
        tooltip={
          checklist.status === ChecklistStatusEnum.APPROVED
            ? "Аннулировать"
            : undefined
        }
        icon={<CrossCircleIcon color="var(--icons-red)" />}
        onClick={() => {
          handleChecklistInvalid(checklist.id);
        }}
      />
    </TableActionsCont>
  );
};
