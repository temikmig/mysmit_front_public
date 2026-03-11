import { Button, Stack } from "@mui/material";
import { FC } from "react";

import { ClientSource, ClientSourceEditDto } from "@entities/clientSource";
import { FormTextField } from "@shared/ui/text-fields";

import { useClientSourceEditForm, useEditClientSource } from "../../model";

interface ClientSourceEditFormProps {
  clientSource: ClientSource;
  onClose?: () => void;
}

export const ClientSourceEditForm: FC<ClientSourceEditFormProps> = ({
  clientSource,
  onClose,
}) => {
  const { editClientSource, isLoading } = useEditClientSource();

  const { control, handleSubmit, formState } =
    useClientSourceEditForm(clientSource);

  const onSubmit = async (data: ClientSourceEditDto) => {
    await editClientSource(clientSource.id, data);
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
          Редактировать источник клиента
        </Button>
      </Stack>
    </form>
  );
};
