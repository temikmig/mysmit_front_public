import { Box, Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { Employee } from "@entities/employee";
import { ServiceBadge } from "@entities/service";
import { useOpenChecklistCardModal } from "@features/checklist";
import {
  useOpenEmployeeCardModal,
  useOpenEmployeeSalaryModal,
} from "@features/employee";
import { moneyFormat } from "@shared/lib";
import { ExpandableBox } from "@shared/ui";

export const useEmployeesColumns = () => {
  const openEmployee = useOpenEmployeeCardModal();
  const openChecklist = useOpenChecklistCardModal();
  const openEmployeeSalaryModal = useOpenEmployeeSalaryModal();

  const columns: GridColDef<Employee>[] = [
    {
      field: "lastName",
      headerName: "Имя сотрудника",
      flex: 1,
      renderCell: (params) => (
        <Link onClick={() => openEmployee(params.row.id, true)}>
          {params.row.firstName} {params.row.lastName}
        </Link>
      ),
    },
    {
      field: "services",
      headerName: "Услуги",
      width: 400,
      renderCell: (params) => {
        const services = params.row.services;

        if (services)
          return (
            <ExpandableBox maxCollapsedHeight={40}>
              <Box display="flex" gap={1} flexWrap="wrap">
                {services.map((service) => (
                  <ServiceBadge
                    key={service.name}
                    service={service}
                    openService
                  />
                ))}
              </Box>
            </ExpandableBox>
          );
      },
    },
    {
      field: "phone",
      headerName: "Телефон",
      width: 200,
    },
    {
      field: "lastChecklist",
      headerName: "Последний чек-лист",
      width: 400,
      renderCell: (params) => {
        const lastChecklist = params.row.lastChecklist;
        if (lastChecklist)
          return (
            <Link onClick={() => openChecklist(lastChecklist.id)}>
              {lastChecklist.name}
            </Link>
          );
        return "-";
      },
    },
    {
      field: "checklistsCount",
      headerName: "Чек-листов",
      align: "right",
      headerAlign: "right",
      width: 100,
    },
    {
      field: "salaryBalance",
      headerName: "Баланс",
      align: "right",
      headerAlign: "right",
      width: 150,
      renderCell: (params) => (
        <Link onClick={() => openEmployeeSalaryModal(params.row.id)}>
          {moneyFormat(params.row.salaryBalance)}
        </Link>
      ),
    },
  ];
  return { columns };
};
