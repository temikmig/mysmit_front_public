import { useGetSupplierQuery } from "../../../api";
import { EditIcon } from "../../../assets/icons";
import Button from "../../ui/Button";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./SupplierCard.module.css";
import { useHandlers } from "../../../common/hooks";

interface SupplierCardProps {
  supplierId: number;
}

export const SupplierCard = ({ supplierId }: SupplierCardProps) => {
  const {
    data: supplier,
    isLoading,
    refetch,
  } = useGetSupplierQuery(supplierId);

  const { handleSupplierEdit } = useHandlers();

  const dataItems: DataGridItem[] =
    (supplier && [
      {
        title: "Поставщик",
        description: supplier.name,
      },
      {
        title: "Контактная информация",
        description: supplier.contactInfo,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (supplier)
    return (
      <div className={styles.supplierCardCont}>
        <h4>Карточка поставщика</h4>
        <DataGrid items={dataItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleSupplierEdit(supplierId, refetch);
            }}
          >
            Редактировать поставщика
          </Button>
        </div>
      </div>
    );
};
