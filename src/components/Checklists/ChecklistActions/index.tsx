/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChecklistStatusEnum, type Checklist } from "../../../common/types";
import { BadgeIcon, CrossCircleIcon } from "../../../assets/icons";
import { useModal } from "../../../common/hooks/useModal";
import { TableAction, TableActionsCont } from "../../ui/TableActions";
import { ChecklistCard } from "../ChecklistCard";
import { useHandlers } from "../../../common/hooks";

interface ChecklistActionsProps {
  checklist: Checklist;
  refetch: () => void;
}

export const ChecklistActions = ({
  checklist,
  refetch,
}: ChecklistActionsProps) => {
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
