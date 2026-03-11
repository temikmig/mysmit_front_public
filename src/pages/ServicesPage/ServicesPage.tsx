import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Service, useGetServicesListQuery } from "@entities/service";
import {
  useOpenServiceCardModal,
  useOpenServiceCreateModal,
} from "@features/service";
import { TablePage } from "@widgets/table-page";

import { useServicesColumn, useServicesActionsColumn } from "./model";

export const ServicesPage = () => {
  const { serviceId } = useParams();

  const createService = useOpenServiceCreateModal();
  const openClientCardModal = useOpenServiceCardModal();

  const { columns } = useServicesColumn();
  const { actionsColumn } = useServicesActionsColumn();

  useEffect(() => {
    if (!serviceId) return;

    openClientCardModal(Number(serviceId), false);
  }, []);

  return (
    <TablePage<Service>
      pageTitle="Услуги"
      query={useGetServicesListQuery}
      columns={[...columns, actionsColumn]}
      actions={[
        {
          icon: <Add />,
          title: "Добавить услугу",
          onClick: createService,
        },
      ]}
    />
  );
};
