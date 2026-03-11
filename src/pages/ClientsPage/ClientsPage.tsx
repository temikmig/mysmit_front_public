import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Client, useGetClientsListQuery } from "@entities/client";
import { useAuth } from "@features/auth";
import {
  useOpenClientCardModal,
  useOpenClientCreateModal,
} from "@features/client";
import { TablePage } from "@widgets/table-page";

import { useClientsColumn, useClientsActionsColumn } from "./model";

export const ClientsPage = () => {
  const { isAdmin } = useAuth();
  const { clientId } = useParams();

  const createClient = useOpenClientCreateModal();
  const openClientCardModal = useOpenClientCardModal();

  const { columns } = useClientsColumn();
  const { actionsColumn } = useClientsActionsColumn();

  useEffect(() => {
    if (!clientId) return;

    openClientCardModal(clientId, false);
  }, []);

  return (
    <TablePage<Client>
      pageTitle="Клиенты"
      query={useGetClientsListQuery}
      columns={[...columns, actionsColumn]}
      actions={
        isAdmin
          ? [
              {
                icon: <Add />,
                title: "Добавить клиента",
                onClick: createClient,
              },
            ]
          : []
      }
    />
  );
};
