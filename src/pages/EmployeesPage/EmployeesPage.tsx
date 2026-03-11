import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Employee, useGetEmployeesListQuery } from "@entities/employee";
import { useAuth } from "@features/auth";
import {
  useOpenEmployeeCardModal,
  useOpenEmployeeCreateModal,
} from "@features/employee";
import { TablePage } from "@widgets/table-page";

import { useEmployeesColumns, useEmployeesActionsColumn } from "./model";

export const EmployeesPage = () => {
  const { isAdmin } = useAuth();

  const { employeeId } = useParams();

  const createEmployee = useOpenEmployeeCreateModal();
  const openEmployeeCardModal = useOpenEmployeeCardModal();

  const { columns } = useEmployeesColumns();
  const { actionsColumn } = useEmployeesActionsColumn();

  useEffect(() => {
    if (!employeeId) return;

    openEmployeeCardModal(employeeId, false);
  }, []);

  return (
    <TablePage<Employee>
      pageTitle="Сотрудники"
      query={useGetEmployeesListQuery}
      columns={[...columns, actionsColumn]}
      actions={
        isAdmin
          ? [
              {
                icon: <Add />,
                title: "Добавить сотрудника",
                onClick: createEmployee,
              },
            ]
          : []
      }
    />
  );
};
