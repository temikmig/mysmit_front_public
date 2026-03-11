import { FC } from "react";

import { ClientSource } from "@entities/clientSource/model";
import { InfoField, StackColumn } from "@shared/ui";

interface ClientSourceDetailsProps {
  clientSource: ClientSource;
}

export const ClientSourceDetails: FC<ClientSourceDetailsProps> = ({
  clientSource,
}) => {
  return (
    <StackColumn>
      <InfoField label="Наименование источника" value={clientSource.name} />
    </StackColumn>
  );
};
