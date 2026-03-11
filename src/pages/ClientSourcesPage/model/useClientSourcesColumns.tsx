import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { ClientSource } from "@entities/clientSource";
import { useOpenClientSourceCardModal } from "@features/client-source";

export const useClientSourcesColumn = () => {
  const openClientSource = useOpenClientSourceCardModal();

  const columns: GridColDef<ClientSource>[] = [
    {
      field: "name",
      headerName: "Наименование",
      flex: 1,
      renderCell: (params) => (
        <Link onClick={() => openClientSource(params.row.id, true)}>
          {params.row.name}
        </Link>
      ),
    },
  ];
  return { columns };
};
