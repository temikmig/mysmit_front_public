import { FC } from "react";

import { ClientSourceDetails, useClientSource } from "@entities/clientSource";
import { Loader, StackColumn } from "@shared/ui";

import { ClientSourceCardActions } from "../ClientSourceCardActions";

interface ClientSourceCardModalProps {
  clientSourceId: string;
}
export const ClientSourceCardModal: FC<ClientSourceCardModalProps> = ({
  clientSourceId,
}) => {
  const { clientSource, isLoading } = useClientSource(clientSourceId);

  if (isLoading) return <Loader />;

  if (!clientSource) return;

  return (
    <StackColumn>
      <ClientSourceDetails clientSource={clientSource} />
      <ClientSourceCardActions clientSource={clientSource} />
    </StackColumn>
  );
};
