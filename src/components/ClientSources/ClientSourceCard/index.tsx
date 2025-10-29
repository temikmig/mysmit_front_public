import { useGetClientSourceQuery } from "../../../api";
import { EditIcon } from "../../../assets/icons";
import Button from "../../ui/Button";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ClientSourceCard.module.css";
import { useHandlers } from "../../../common/hooks";

interface ClientSourceCardProps {
  clientSourceId: string;
}

export const ClientSourceCard = ({ clientSourceId }: ClientSourceCardProps) => {
  const { data: clientSource, isLoading } =
    useGetClientSourceQuery(clientSourceId);

  const { handleClientSourceEdit } = useHandlers();

  const dataItems: DataGridItem[] =
    (clientSource && [
      {
        title: "Источник",
        description: clientSource.name,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (clientSource)
    return (
      <div className={styles.clientSourceCardCont}>
        <h4>Карточка источника</h4>
        <DataGrid items={dataItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleClientSourceEdit(clientSourceId);
            }}
          >
            Редактировать источник
          </Button>
        </div>
      </div>
    );
};
