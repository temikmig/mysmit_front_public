import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { ChecklistCreateDto } from "@entities/checklist";
import {
  Client,
  ClientAutocomplete,
  ClientCarAutocomplete,
  ClientLoyaltyBadge,
  LOYALTY_CARD_LEVEL_PERSENT,
} from "@entities/client";
import { useAuth } from "@features/auth";
import { useOpenClientCardModal } from "@features/client";
import { isMobileRequest } from "@shared/lib";
import { FormSection, FormTextField } from "@shared/ui";

interface ClientSectionProps {
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
}

export const ClientSection: FC<ClientSectionProps> = ({
  control,
  setValue,
}) => {
  const isMobile = isMobileRequest();

  const { permissions } = useAuth();

  const openClientCard = useOpenClientCardModal();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clientId = useWatch({
    control,
    name: "clientId",
  });

  const price = useWatch({
    control,
    name: "price",
  });

  const isManualClient = useWatch({
    control,
    name: "isManualClient",
  });

  useEffect(() => {
    if (!permissions.canViewClients) {
      setValue("isManualClient", true);
    }
  }, []);

  useEffect(() => {
    if (selectedClient) {
      const percent = selectedClient.loyaltyСardLevel
        ? (LOYALTY_CARD_LEVEL_PERSENT[selectedClient.loyaltyСardLevel] ?? 0)
        : 0;

      const loyaltyVal = price * percent;
      setValue("loyalty", loyaltyVal);
    } else {
      setValue("loyalty", 0);
    }
  }, [selectedClient, price]);

  useEffect(() => {
    if (!clientId) {
      setSelectedClient(null);
    }
  }, [clientId]);

  return (
    <FormSection title="Клиент">
      {permissions.canViewClients && (
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={isManualClient}
                onChange={(e) => {
                  setValue("isManualClient", e.target.checked);
                  setSelectedClient(null);
                }}
                slotProps={{ input: { "aria-label": "controlled" } }}
              />
            }
            label="Ввести клиента и автомобиль вручную"
          />
        </Box>
      )}
      {!isManualClient ? (
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
          <Box display="flex" flex={1} flexDirection="column" gap={1}>
            <ClientAutocomplete
              label="Клиент"
              name="clientId"
              control={control}
              onChange={() => setValue("clientCarId", null)}
              onClientCreated={(client) => {
                setValue("clientId", client.id, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setSelectedClient(client.object);
              }}
              onSelected={(client) => setSelectedClient(client)}
            />
            {selectedClient && (
              <Box gap={2} display="flex" alignItems="center">
                <Button
                  startIcon={<PersonPinIcon />}
                  onClick={() => openClientCard(selectedClient.id)}
                  variant="outlined"
                >
                  Открыть клиента
                </Button>
                <ClientLoyaltyBadge
                  loyaltyLevel={selectedClient.loyaltyСardLevel}
                />
              </Box>
            )}
          </Box>
          {clientId && (
            <Box width="50%" flex={1}>
              <ClientCarAutocomplete
                clientId={clientId}
                label="Автомобиль "
                name="clientCarId"
                control={control}
                onClientCarCreated={(clientCar) => {
                  setValue("clientCarId", clientCar.id, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
          {permissions.canViewClients && (
            <Box width="50%">
              <FormTextField
                label="Клиент"
                fullWidth
                name="clientString"
                control={control}
              />
            </Box>
          )}
          <Box flex={1}>
            <FormTextField
              fullWidth
              label="Автомобиль"
              name="clientCarString"
              control={control}
            />
          </Box>
        </Box>
      )}
    </FormSection>
  );
};
