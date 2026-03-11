import PaymentsIcon from "@mui/icons-material/Payments";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { FC } from "react";

import { ChecklistEmployee } from "@entities/checklist/model";
import { useAuth } from "@features/auth";
import { moneyFormat } from "@shared/lib";
interface ChecklistEmployeeItemProps {
  checklistEmployee: ChecklistEmployee;
}

export const ChecklistEmployeeItem: FC<ChecklistEmployeeItemProps> = ({
  checklistEmployee,
}) => {
  const { isAdmin } = useAuth();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar></Avatar>
        <Typography>
          {checklistEmployee.firstName} {checklistEmployee.lastName}
        </Typography>
      </Box>
      {isAdmin && (
        <Chip
          icon={<PaymentsIcon />}
          label={moneyFormat(checklistEmployee.salary)}
        />
      )}
    </Box>
  );
};
