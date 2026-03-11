import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Avatar, Typography, IconButton, Button } from "@mui/material";
import { FC } from "react";

import { Car } from "@entities/client/model";
import { useAuth } from "@features/auth";
import {
  useOpenClientCarEditModal,
  useOpenClientCarDeleteModal,
  useOpenClientCarCreateModal,
} from "@features/client";

interface ClientCarsCont {
  clientId: string;
  clientCars?: Car[];
}

export const ClientCarsCont: FC<ClientCarsCont> = ({
  clientId,
  clientCars,
}) => {
  const { isAdmin } = useAuth();

  const openEditCar = useOpenClientCarEditModal();
  const openDeleteCar = useOpenClientCarDeleteModal();
  const openCreate = useOpenClientCarCreateModal(clientId);

  return (
    <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
      {clientCars &&
        clientCars.map((clientCar) => (
          <Box display="flex" alignItems="center" gap={1} padding={1}>
            <Avatar>
              <DirectionsCarIcon fontSize="large" />
            </Avatar>
            <Typography>
              {clientCar.mark} {clientCar.model}{" "}
              {clientCar.number && `(${clientCar.number})`}
            </Typography>
            {isAdmin && (
              <>
                <IconButton onClick={() => openEditCar(clientCar.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => openDeleteCar(clientCar.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        ))}
      {isAdmin && (
        <Button
          variant="text"
          onClick={() => openCreate()}
          startIcon={
            <Avatar>
              <AddIcon fontSize="large" />
            </Avatar>
          }
        >
          Добавить автомобиль
        </Button>
      )}
    </Box>
  );
};
