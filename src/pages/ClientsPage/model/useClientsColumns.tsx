import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { Client, ClientLoyaltyBadge } from "@entities/client";
import { useOpenChecklistCardModal } from "@features/checklist";
import { useOpenClientCardModal } from "@features/client";
import { formatDateToText } from "@shared/lib";

export const useClientsColumn = () => {
  const openClient = useOpenClientCardModal();
  const openChecklist = useOpenChecklistCardModal();

  const columns: GridColDef<Client>[] = [
    {
      field: "lastName",
      headerName: "Имя клиента",
      flex: 1,
      renderCell: (params) => (
        <Link onClick={() => openClient(params.row.id, true)}>
          {params.row.firstName} {params.row.lastName}
        </Link>
      ),
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
      field: "phone",
      headerName: "Телефон",
      align: "right",
      headerAlign: "right",
      width: 150,
    },
    {
      field: "birthday",
      headerName: "Дата рождения",
      align: "right",
      headerAlign: "right",
      width: 150,
      renderCell: (params) =>
        `${formatDateToText(params.row.birthday, "date string")}`,
    },
    {
      field: "loyaltyСardLevel",
      headerName: "Лояльность",
      width: 150,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <ClientLoyaltyBadge loyaltyLevel={params.row.loyaltyСardLevel} />
      ),
    },
  ];
  return { columns };
};
