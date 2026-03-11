import { Button, Stack } from "@mui/material";
import { FC } from "react";

import {
  ClientSourceCreateDto,
  ClientSourceSearchOption,
} from "@entities/clientSource";
import { FormTextField } from "@shared/ui/text-fields";

import { useClientSourceCreateForm, useCreateClientSource } from "../../model";

interface ClientSourceCreateFormProps {
  onClose?: () => void;
  onSuccess?: (clientSource: ClientSourceSearchOption) => void;
}

export const ClientSourceCreateForm: FC<ClientSourceCreateFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const { createClientSource, isLoading } = useCreateClientSource();

  const { control, handleSubmit, formState } = useClientSourceCreateForm();

  const onSubmit = async (data: ClientSourceCreateDto) => {
    const newClientSource = await createClientSource(data);

    if (newClientSource) {
      onSuccess?.(newClientSource);
    }

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormTextField
          name="name"
          label="Наименование источника клиента"
          control={control}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Добавить источник клиента
        </Button>
      </Stack>
    </form>
  );
};
