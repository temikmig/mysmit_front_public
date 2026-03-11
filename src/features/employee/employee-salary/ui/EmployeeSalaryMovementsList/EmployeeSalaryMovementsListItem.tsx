import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";

import { EmployeeSalaryMovement } from "@entities/employee";
import { useAuth } from "@features/auth";
import {
  useOpenChecklistCardModal,
  useOpenChecklistEditModal,
} from "@features/checklist";
import {
  useOpenEmployeeSalaryMovementDeleteModal,
  useOpenEmployeeSalaryMovementEditModal,
} from "@features/employee";
import { formatDateToText, moneyFormat } from "@shared/lib";

interface EmployeeSalaryMovementsListItemProps {
  movement: EmployeeSalaryMovement;
}

export const EmployeeSalaryMovementsListItem: FC<
  EmployeeSalaryMovementsListItemProps
> = ({ movement }) => {
  const { isAdmin } = useAuth();

  const openChecklistCardModal = useOpenChecklistCardModal();
  const editChecklist = useOpenChecklistEditModal();

  const editMovement = useOpenEmployeeSalaryMovementEditModal();
  const deleteMovement = useOpenEmployeeSalaryMovementDeleteModal();

  const checklist = movement.сhecklist;

  const handleOpenChecklist = () => {
    if (!checklist) return;

    openChecklistCardModal(checklist.id);
  };

  const handleEditMovement = () => {
    if (checklist) {
      editChecklist(checklist.id);
      return;
    }
    editMovement(movement.id);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ verticalAlign: "top" }}>
        <Box display="flex" gap={1} alignItems="flex-start">
          <Avatar sx={{ width: 32, height: 32 }}>
            <PaymentsIcon fontSize="small" />
          </Avatar>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2">
              {formatDateToText(movement.movementDate, "date string")}
            </Typography>
            {checklist && (
              <>
                <Typography variant="body2">
                  {checklist.serviceName} ({checklist.car})
                </Typography>
                <Typography variant="body2"></Typography>
                {checklist.comment && (
                  <Typography variant="body2">{checklist.comment}</Typography>
                )}
              </>
            )}
            <Typography variant="caption">{movement.comment}</Typography>
            {checklist && isAdmin && (
              <Button onClick={handleOpenChecklist}>Открыть чек-лист</Button>
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ verticalAlign: "top" }} align="right">
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              color:
                movement.type === "INCREASE" ? "success.main" : "error.main",
              fontWeight: 500,
              opacity: movement.isNotChangeBalance ? 0.3 : 1,
            }}
          >
            {movement.type === "INCREASE" ? "+" : "-"}
            {moneyFormat(movement.amount)}
          </Typography>
          {isAdmin && (
            <Box>
              <IconButton onClick={handleEditMovement}>
                <EditIcon />
              </IconButton>
              {!checklist && (
                <IconButton onClick={() => deleteMovement(movement.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};
