import { Box, Link, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { ChecklistListItem, ChecklistStatusBadge } from "@entities/checklist";
import { useAuth } from "@features/auth";
import { useOpenChecklistCardModal } from "@features/checklist";
import { useOpenClientCardModal } from "@features/client";
import { useOpenEmployeeCardModal } from "@features/employee";
import { formatDateToText, formatMinutes, moneyFormat } from "@shared/lib";

export const useChecklistColumns = () => {
  const openChecklistCardModal = useOpenChecklistCardModal();
  const openEmployee = useOpenEmployeeCardModal();
  const openClient = useOpenClientCardModal();
  const { permissions } = useAuth();

  const columns: GridColDef<ChecklistListItem>[] = [
    {
      field: "checklistDate",
      headerName: "Дата",
      width: 150,
      renderCell: (params) =>
        `${formatDateToText(params.row.checklistDate, "date")}`,
    },
    {
      field: "service.name",
      headerName: "Услуга",
      flex: 1,
      renderCell: (params) => {
        const comment = params.row.comment;
        return (
          <Box display="flex" flexDirection="column" gap={1}>
            <Link onClick={() => openChecklistCardModal(params.row.id, true)}>
              {params.row.serviceName}
            </Link>
            {comment && (
              <Typography variant="subtitle2" color="textSecondary">
                {comment}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Сумма",
      type: "number",
      align: "right",
      headerAlign: "right",
      width: 150,
      renderCell: (params) => `${moneyFormat(params.row.price)}`,
    },
    {
      field: "workTime",
      headerName: "Время",
      align: "right",
      headerAlign: "right",
      width: 150,
      renderCell: (params) => `${formatMinutes(params.row.workTime)}`,
    },
    {
      field: "client.lastName",
      headerName: "Клиент / автомобиль",
      width: 300,
      renderCell: (params) => {
        const client = params.row.client;

        return (
          <Box>
            {permissions.canViewClients && (
              <Box>
                {client ? (
                  <Link
                    onClick={() => openClient(client.id)}
                  >{`${client.firstName} ${client.lastName ?? ""}`}</Link>
                ) : (
                  params.row.clientString
                )}
              </Box>
            )}
            <Box>
              {params.row.car
                ? `${params.row.car.mark} ${params.row.car.model}`
                : params.row.carString}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "employees",
      headerName: "Сотрудники",
      width: 300,
      renderCell: (params) => {
        const checklistEmployees = params.row.checklistEmployees;

        return (
          <Box display="flex" flexDirection="column" gap={1}>
            {checklistEmployees.map((checklistEmployee) => (
              <Link
                key={checklistEmployee.firstName}
                onClick={() => openEmployee(checklistEmployee.id)}
              >
                {checklistEmployee.firstName} {checklistEmployee.lastName}
              </Link>
            ))}
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Статус",
      width: 150,
      renderCell: (params) => (
        <ChecklistStatusBadge fullWidth status={params.row.status} />
      ),
    },
  ];
  return { columns };
};
