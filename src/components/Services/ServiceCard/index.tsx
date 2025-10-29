import { useGetServiceQuery } from "../../../api";
import { EditIcon } from "../../../assets/icons";
import Button from "../../ui/Button";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ServiceCard.module.css";
import { useHandlers } from "../../../common/hooks";

interface ServiceCardProps {
  serviceId: number;
}

export const ServiceCard = ({ serviceId }: ServiceCardProps) => {
  const { data: service, isLoading } = useGetServiceQuery(serviceId);

  const { handleServiceEdit } = useHandlers();

  const dataItems: DataGridItem[] =
    (service && [
      {
        title: "Наименование",
        description: service.name,
      },
      {
        title: "Короткое наименование",
        description: service.shortName || undefined,
      },
      {
        title: "Процент на зарплаты",
        description: `${service.salaryPercent! * 100}%`,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (service)
    return (
      <div className={styles.serviceCardCont}>
        <h4>Карточка услуги</h4>
        <DataGrid items={dataItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleServiceEdit(serviceId);
            }}
          >
            Редактировать услугу
          </Button>
        </div>
      </div>
    );
};
