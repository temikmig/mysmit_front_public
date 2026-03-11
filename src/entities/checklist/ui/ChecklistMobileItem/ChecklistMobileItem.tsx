import { Box, Divider, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ChecklistListItem } from "@entities/checklist/model";
import { useAuth } from "@features/auth";
import { formatDateToText, moneyFormat, formatMinutes } from "@shared/lib";

import { ChecklistStatusBadge } from "../ChecklistStatusBadge";
import { ChecklistItem } from "./ChecklistMobileItem.styled";

interface ChecklistMobileItemProps {
  checklist: ChecklistListItem;
}

export const ChecklistMobileItem: FC<ChecklistMobileItemProps> = ({
  checklist,
}) => {
  const navigate = useNavigate();

  const { permissions } = useAuth();

  const checklistEmployees = checklist.checklistEmployees;
  const checklistClient = checklist.client;
  const checklistCar = checklist.car;

  return (
    <ChecklistItem onClick={() => navigate(`/m/checklist/${checklist.id}`)}>
      <Typography variant="subtitle2" color="white">
        {formatDateToText(checklist.checklistDate, "date")}
      </Typography>
      <Typography variant="body1" color="white">
        {checklist.serviceName} — {moneyFormat(checklist.price)}
      </Typography>
      <Divider />
      <Typography variant="body1" color="white">
        Время: {formatMinutes(checklist.workTime)}
      </Typography>
      <Divider />
      <Box>
        Клиент / автомобиль:
        <Typography>
          {permissions.canViewClients &&
            (checklistClient
              ? `${checklistClient.firstName} ${checklistClient.lastName ?? ""} - `
              : checklist.clientString
                ? `${checklist.clientString} - `
                : "")}
          {checklistCar
            ? `${checklistCar.mark} ${checklistCar.model}`
            : checklist.carString}
        </Typography>
      </Box>
      <Divider />
      <Box>
        {`Сотрудник${checklistEmployees.length > 1 ? "и" : ""}:`}
        {checklistEmployees.map((checklistEmployee) => (
          <Typography key={checklistEmployee.id}>
            {checklistEmployee.firstName} {checklistEmployee.lastName}
          </Typography>
        ))}
      </Box>
      <ChecklistStatusBadge status={checklist.status} />
    </ChecklistItem>
  );
};
