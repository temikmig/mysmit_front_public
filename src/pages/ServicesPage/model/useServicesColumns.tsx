import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { Service, ServiceIcon } from "@entities/service";
import { useOpenServiceCardModal } from "@features/service";

export const useServicesColumn = () => {
  const openService = useOpenServiceCardModal();

  const columns: GridColDef<Service>[] = [
    {
      field: "color",
      headerName: "",
      width: 64,
      renderCell: (params) => <ServiceIcon service={params.row} />,
    },
    {
      field: "name",
      headerName: "Наименование",
      flex: 1,
      renderCell: (params) => (
        <Link onClick={() => openService(params.row.id, true)}>
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "shortName",
      headerName: "Короткое наименование",
      width: 400,
    },
    {
      field: "salaryPercent",
      headerName: "Процент",
      width: 100,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => `${params.row.salaryPercent * 100}%`,
    },
    {
      field: "postNumber",
      headerName: "Постов",
      width: 100,
      align: "right",
      headerAlign: "right",
    },
  ];
  return { columns };
};
