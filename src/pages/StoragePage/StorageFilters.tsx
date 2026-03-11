import { Button, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ServiceAutocomplete } from "@entities/service";

import { FiltersStorage } from "./model";

interface StorageFiltersProps {
  value: FiltersStorage;
  onApply: (data: FiltersStorage) => void;
}

export const StorageFilters: FC<StorageFiltersProps> = ({ value, onApply }) => {
  const { control, handleSubmit, setValue, reset } = useForm<FiltersStorage>();

  const hasFilters = Object.values(value).some(
    (v) => v !== undefined && v !== null && v !== "",
  );

  useEffect(() => {
    reset(value);
  }, [value, reset]);

  return (
    <Stack spacing={2} width={320}>
      <Typography variant="h6">Фильтры</Typography>

      <ServiceAutocomplete
        control={control}
        name="serviceId"
        label="Услуга"
        onSelected={(service) => {
          setValue("serviceId", service?.id);
          setValue("serviceName", service?.name);
          handleSubmit(onApply)();
        }}
      />
      {hasFilters && (
        <Button
          variant="outlined"
          onClick={() => {
            reset({});
            onApply({});
          }}
        >
          Сбросить фильтр
        </Button>
      )}
    </Stack>
  );
};
