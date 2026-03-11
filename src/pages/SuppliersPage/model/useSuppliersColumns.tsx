import CheckIcon from "@mui/icons-material/Check";
import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { Supplier } from "@entities/supplier";
import { useOpenSupplierCardModal } from "@features/supplier";

export const useSuppliersColumns = () => {
  const openSupplier = useOpenSupplierCardModal();

  const columns: GridColDef<Supplier>[] = [
    {
      field: "name",
      headerName: "Имя поставщика",
      width: 300,
      renderCell: (params) => (
        <Link onClick={() => openSupplier(params.row.id, true)}>
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "isSupplier",
      headerName: "Поставщик",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (params.row.isSupplier ? <CheckIcon /> : null),
    },
    {
      field: "contactInfo",
      headerName: "Контактная информация",
      flex: 1,
    },
  ];
  return { columns };
};
