import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { User, UserAvatar, UserRoleBadge } from "@entities/user";
import { useOpenEmployeeCardModal } from "@features/employee";
import { useOpenUserProfileModal } from "@features/user";

export const useUsersColumn = () => {
  const openProfile = useOpenUserProfileModal();
  const openEmployee = useOpenEmployeeCardModal();

  const columns: GridColDef<User>[] = [
    {
      field: "avatar",
      filterable: false,
      sortable: false,
      headerName: "Аватар",
      width: 64,
      resizable: false,
      renderCell: (params) => <UserAvatar user={params.row} />,
    },
    {
      field: "lastName",
      headerName: "Имя",
      width: 300,
      renderCell: (params) => (
        <Link onClick={() => openProfile(params.row.id, true)}>
          {params.row.firstName} {params.row.lastName}
        </Link>
      ),
    },
    {
      field: "employee",
      filterable: false,
      sortable: false,
      headerName: "Сотрудник",
      width: 300,
      resizable: false,
      renderCell: (params) => {
        const employee = params.row.employee;

        return employee ? (
          <Link onClick={() => openEmployee(employee.id)}>
            {employee.firstName} {employee.lastName}
          </Link>
        ) : (
          "-"
        );
      },
    },
    {
      field: "role",
      filterable: false,
      sortable: false,
      headerName: "Роль",
      width: 200,
      resizable: false,
      renderCell: (params) => <UserRoleBadge role={params.row.role} />,
    },
    {
      field: "login",
      headerName: "Логин",
      flex: 1,
    },
  ];
  return { columns };
};
