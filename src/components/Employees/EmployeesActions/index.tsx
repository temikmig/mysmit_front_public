/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadgeIcon,
  CoinsIcon,
  DeleteIcon,
  EditIcon,
} from "../../../assets/icons";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import type { Employee } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";

interface ServicesActionsProps {
  employee: Employee;
  refetch: () => void;
}

export const EmployeesActions = ({
  employee,
  refetch,
}: ServicesActionsProps) => {
  const {
    handleEmployeeEdit,
    handleEmployeeCard,
    handleEmployeeDelete,
    handleEmployeeTransferSalary,
  } = useHandlers();

  return (
    <TableActionsCont>
      <TableAction
        tooltip="Карточка"
        icon={<BadgeIcon />}
        onClick={() => {
          handleEmployeeCard(employee.id);
        }}
      />

      <TableAction
        tooltip="Начислить зарплату"
        icon={<CoinsIcon />}
        onClick={() => {
          handleEmployeeTransferSalary(employee.id, refetch);
        }}
      />
      <TableAction
        tooltip="Редактировать"
        icon={<EditIcon />}
        onClick={() => {
          handleEmployeeEdit(employee.id, refetch);
        }}
      />
      <TableAction
        tooltip="Удалить"
        icon={<DeleteIcon />}
        onClick={() => {
          handleEmployeeDelete(employee.id, refetch);
        }}
      />
    </TableActionsCont>
  );
};
