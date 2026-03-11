import { FC } from "react";

import { Service } from "@entities/service";
import { pluralForm } from "@shared/lib";
import { InfoField, StackColumn } from "@shared/ui";

interface ServiceDetailsProps {
  service: Service;
}

export const ServiceDetails: FC<ServiceDetailsProps> = ({ service }) => {
  return (
    <StackColumn>
      <InfoField label="Наименование" value={service.name} />
      <InfoField label="Короткое наименование" value={service.shortName} />
      <InfoField
        label="Процент на зарплату"
        value={`${service.salaryPercent * 100}%`}
      />
      <InfoField
        label="Количество постов"
        value={`${service.postNumber} ${pluralForm(service.postNumber, ["пост", "поста", "постов"])}`}
      />
    </StackColumn>
  );
};
