import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { ChecklistCreateDto } from "@entities/checklist";
import { Service, ServiceAutocomplete } from "@entities/service";
import { isMobileRequest } from "@shared/lib";
import { FormSection, FormDatePicker, FormNumberField } from "@shared/ui";

interface InfoSectionProps {
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
  service?: Service;
}

export const InfoSection: FC<InfoSectionProps> = ({
  control,
  setValue,
  service,
}) => {
  const isMobile = isMobileRequest();

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const price = useWatch({
    control,
    name: "price",
  });

  const checkService = selectedService ?? service;

  useEffect(() => {
    if (!checkService) return;

    const percent = checkService.salaryPercent ?? 0;
    setValue("salary", price * percent);
  }, [checkService, price]);

  return (
    <FormSection title="Информация">
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
        <FormDatePicker name="checklistDate" label="Дата" control={control} />
        <Box flex={1}>
          <ServiceAutocomplete
            label="Услуга"
            name="serviceId"
            control={control}
            onServiceCreated={(service) => {
              setValue("serviceId", service.id, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setSelectedService(service.object!);
            }}
            onSelected={(service) => setSelectedService(service)}
          />
        </Box>
        <Box>
          <FormNumberField
            label="Время"
            name="workTime"
            control={control}
            icon={<AccessTimeIcon />}
            min={0}
            fullWidth
          />
        </Box>
      </Box>
    </FormSection>
  );
};
