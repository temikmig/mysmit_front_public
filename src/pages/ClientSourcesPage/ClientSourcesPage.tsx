import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  ClientSource,
  useGetClientSourcesListQuery,
} from "@entities/clientSource";
import {
  useOpenClientSourceCardModal,
  useOpenClientSourceCreateModal,
} from "@features/client-source";
import { TablePage } from "@widgets/table-page";

import { useClientSourcesActionsColumn, useClientSourcesColumn } from "./model";

export const ClientSourcesPage = () => {
  const { clientSourceId } = useParams();

  const createClientSource = useOpenClientSourceCreateModal();
  const openClientSourceCardModal = useOpenClientSourceCardModal();

  const { columns } = useClientSourcesColumn();
  const { actionsColumn } = useClientSourcesActionsColumn();

  useEffect(() => {
    if (!clientSourceId) return;

    openClientSourceCardModal(clientSourceId, false);
  }, []);

  return (
    <TablePage<ClientSource>
      pageTitle="Источники клиентов"
      query={useGetClientSourcesListQuery}
      columns={[...columns, actionsColumn]}
      actions={[
        {
          icon: <Add />,
          title: "Добавить источник клиента",
          onClick: createClientSource,
        },
      ]}
    />
  );
};
