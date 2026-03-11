import { Link } from "@mui/material";
import { FC } from "react";

import { Client, CLIENT_SEX_LABELS } from "@entities/client/model";
import { useOpenClientSourceCardModal } from "@features/client-source";
import { formatDateToText } from "@shared/lib";
import { InfoField, InfoGroup, StackColumn } from "@shared/ui";

import { ClientCarsCont } from "../ClientCarsCont";
import { ClientLoyaltyBadge } from "../ClientLoyaltyBadge";

interface ClientDetailsProps {
  client: Client;
}

export const ClientDetails: FC<ClientDetailsProps> = ({ client }) => {
  const openClientSource = useOpenClientSourceCardModal();

  const clientSource = client.clientSource;
  const clientCars = client.cars;

  return (
    <StackColumn>
      <InfoGroup
        items={[
          {
            label: "Имя клиента",
            value: `${client.firstName} ${client.lastName ?? ""}`,
          },
          {
            label: "Дата рождения",
            value: `${formatDateToText(client.birthday, "date string")}`,
          },
          {
            label: "Пол",
            value: client.sex && `${CLIENT_SEX_LABELS[client.sex]}`,
            replacement: "Не указан",
          },
          {
            label: "Телефон",
            value: `${client.phone}`,
          },

          {
            label: "Карта лояльности",
            value: client.loyaltyСardNum && `#${client.loyaltyСardNum}`,
            replacement: "Отсутствует",
          },
          {
            label: "Уровень лояльности",
            value: client.loyaltyСardNum && (
              <ClientLoyaltyBadge loyaltyLevel={client.loyaltyСardLevel} />
            ),
          },
          {
            label: "Источник",
            value: clientSource && (
              <Link onClick={() => openClientSource(clientSource.id)}>
                {clientSource.name}
              </Link>
            ),
            replacement: "Не указан",
          },
        ]}
      />
      <InfoField
        label={`Автомобил${clientCars && clientCars.length > 1 ? "и" : "ь"}`}
        value={<ClientCarsCont clientId={client.id} clientCars={clientCars} />}
      />
    </StackColumn>
  );
};
