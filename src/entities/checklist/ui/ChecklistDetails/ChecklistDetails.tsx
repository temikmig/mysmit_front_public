import { Alert, AlertTitle, Box, Link } from "@mui/material";
import { FC } from "react";

import { useModal } from "@app/providers";
import { Checklist } from "@entities/checklist/model";
import { ServiceBadge } from "@entities/service";
import { useAuth } from "@features/auth";
import { useOpenClientCardModal } from "@features/client";
import {
  formatDateToText,
  formatMinutes,
  isMobileRequest,
  moneyFormat,
} from "@shared/lib";
import {
  Footer,
  InfoField,
  InfoGroup,
  Main,
  ModalGridLayout,
  Sidebar,
} from "@shared/ui";

import { ChecklistStatusBadge } from "../ChecklistStatusBadge";
import { ChecklistAnalyticsTable } from "./ChecklistAnalyticsTable";
import { ChecklistEmployeeItem } from "./ChecklistEmployeeItem";
import { ChecklistItemsTable } from "./ChecklistItemsTable";
import { ChecklistStatusStepper } from "./ChecklistStatusStepper";

interface ChecklistDetailsProps {
  checklist: Checklist;
}

export const ChecklistDetails: FC<ChecklistDetailsProps> = ({ checklist }) => {
  const { isAdmin, permissions } = useAuth();

  const openClientCard = useOpenClientCardModal();

  const checklistClient = checklist.client;
  const checklistClientCar = checklist.clientCar;
  const rejectedBy = checklist.rejectedBy;

  const { metrics, isFullScreen } = useModal();

  const modalHeight = metrics?.height;

  const isMobile = isMobileRequest();

  return (
    <ModalGridLayout fullscreen={isFullScreen} isMobile={isMobile}>
      <Main display="flex" flexDirection="column" gap={2}>
        {!isMobile && (
          <InfoField value={<ChecklistStatusStepper checklist={checklist} />} />
        )}
        {rejectedBy && (
          <Alert variant="filled" severity="error">
            <AlertTitle>
              {" "}
              Чек-лист отклонен ({rejectedBy.fullName},{" "}
              {formatDateToText(rejectedBy.date, "datetime string")})
            </AlertTitle>
            Комментарий: {rejectedBy.comment}
          </Alert>
        )}
        <InfoGroup
          items={[
            ...(permissions.canViewClients
              ? [
                  {
                    label: "Клиент",
                    value: checklistClient ? (
                      <Link
                        onClick={() => openClientCard(checklistClient.id)}
                      >{`${checklistClient.firstName} ${checklistClient.lastName ?? ""}`}</Link>
                    ) : (
                      checklist.clientString
                    ),
                  },
                ]
              : []),
            {
              label: "Автомобиль",
              value: checklistClientCar
                ? `${checklistClientCar.mark} ${checklistClientCar.model}`
                : checklist.clientCarString,
            },
            {
              label: "Дата",
              value: formatDateToText(checklist.checklistDate, "date string"),
            },
            {
              label: "Время работы",
              value: formatMinutes(checklist.workTime),
            },
            {
              label: "Услуга",
              value: (
                <ServiceBadge
                  service={checklist.service}
                  openService={isAdmin}
                />
              ),
            },
            {
              label: "Статус",
              value: <ChecklistStatusBadge status={checklist.status} />,
            },
            {
              label: "Стоимость услуги",
              value: moneyFormat(checklist.price),
            },
            {
              label: "Сотрудник",
              value: (
                <Box display="flex" flexDirection="column" gap={1}>
                  {checklist.checklistEmployees.map((checklistEmployee) => (
                    <ChecklistEmployeeItem
                      key={checklistEmployee.id}
                      checklistEmployee={checklistEmployee}
                    />
                  ))}
                </Box>
              ),
            },
            {
              label: "Комментарий",
              value: checklist.comment,
            },
            {
              label: "Комментарий по материалам",
              value: checklist.itemsComment,
            },
          ]}
          columns={2}
        />
      </Main>
      <Footer>
        <ChecklistItemsTable
          serviceId={checklist.serviceId}
          checklistItems={checklist.checklistItems}
          maxHeight={modalHeight}
        />
      </Footer>
      {isAdmin && (
        <Sidebar>
          <Box width="100%" sx={{ position: "sticky", top: 0 }}>
            <ChecklistAnalyticsTable
              checklistAnalytics={checklist.checklistAnalytics}
            />
          </Box>
        </Sidebar>
      )}
    </ModalGridLayout>
  );
};
