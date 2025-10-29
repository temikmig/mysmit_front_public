import clsx from "clsx";
import { useGetClientQuery } from "../../../api";
import { DeleteIcon, EditIcon, PlusMinIcon } from "../../../assets/icons";
import { useHandlers } from "../../../common/hooks";
import Button from "../../ui/Button";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import { IconButton } from "../../ui/IconButton";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ClientCard.module.css";
import { ClientLoyaltyCardTag } from "../ClientLoyaltyCardTag";
import { CLIENT_SEX_LABELS } from "../../../common/types";
import { ClickLink } from "../../ui/ClickLink";
import { formatDateToText, moneyFormat } from "../../../common/functions";

interface ClientCardProps {
  clientId: string;
}

export const ClientCard = ({ clientId }: ClientCardProps) => {
  const { data: client, isLoading } = useGetClientQuery(clientId);

  const {
    handleClientEdit,
    handleClientCarAdd,
    handleClientCarEdit,
    handleClientCarDelete,
    handleClientSourceCard,
  } = useHandlers();

  const dataItems: DataGridItem[] =
    (client && [
      {
        title: "Имя клиента",
        description: `${client.firstName} ${client.lastName}`,
      },
      {
        title: "Дата рождения",
        description: client.birthday
          ? formatDateToText(client.birthday, "date string")
          : undefined,
      },
      {
        title: "Пол",
        description: client.sex
          ? `${CLIENT_SEX_LABELS[client.sex]}`
          : undefined,
      },
      {
        title: "Телефон",
        description: client.phone,
      },
      {
        title: "Карта лояльности",
        description:
          client.loyaltyСardNum && client.loyaltyСardLevel ? (
            <>
              {client.loyaltyСardNum}
              <ClientLoyaltyCardTag
                min
                loyaltyСardLevel={client.loyaltyСardLevel}
              />
            </>
          ) : undefined,
      },
      {
        title: "Баланс карты",
        description: moneyFormat(client.loyaltyBalance),
      },
      {
        title: "Источник",
        description: client.source ? (
          <ClickLink
            onClick={() => {
              handleClientSourceCard(client.sourceId);
            }}
          >
            {client.source.name}
          </ClickLink>
        ) : undefined,
      },
      {
        title: `Автомобил${client.cars && client.cars.length > 1 ? `и` : `ь`}`,
        description:
          client.cars.length > 0 ? (
            <div className={styles.clientCarsCont}>
              {client.cars?.map((car) => (
                <div className={clsx("text_medium", styles.clientCarItem)}>
                  {`${car.mark} ${car.model} ${car.year} ${car.color} ${
                    car.number ? `(${car.number})` : ``
                  }`}
                  <IconButton
                    size="small"
                    variant="outline"
                    tooltip="Редактировать"
                    icon={<EditIcon />}
                    onClick={() => handleClientCarEdit(car.id)}
                  />
                  <IconButton
                    size="small"
                    variant="outline"
                    tooltip="Удалить"
                    icon={<DeleteIcon />}
                    onClick={() => handleClientCarDelete(car.id)}
                  />
                </div>
              ))}
            </div>
          ) : undefined,
      },
    ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (client)
    return (
      <div className={styles.clientCardCont}>
        <h4>Карточка клиента</h4>
        <DataGrid items={dataItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<PlusMinIcon />}
            onClick={() => {
              handleClientCarAdd(clientId);
            }}
          >
            Добавить автомобиль
          </Button>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleClientEdit(clientId);
            }}
          >
            Редактировать клиента
          </Button>
        </div>
      </div>
    );
};
