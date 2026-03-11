import { Button } from "@mui/material";
import { FC } from "react";

import { ClientCarCreateDto, ClientCarSearchOption } from "@entities/client";
import { StackColumn, FormTextField } from "@shared/ui";

import { useClientCarCreateForm, useCreateClientCar } from "../../model";

interface ClientCarCreateFormProps {
  onClose?: () => void;
  onSuccess?: (client: ClientCarSearchOption) => void;
  initial?: Partial<ClientCarCreateDto>;
  clientId: string;
}

export const ClientCarCreateForm: FC<ClientCarCreateFormProps> = ({
  onClose,
  onSuccess,
  initial,
  clientId,
}) => {
  const { createClientCar, isLoading } = useCreateClientCar();

  const { control, handleSubmit, formState } = useClientCarCreateForm(
    clientId,
    initial,
  );

  const onSubmit = async (data: ClientCarCreateDto) => {
    const newClientCar = await createClientCar(data);

    if (newClientCar) {
      onSuccess?.(newClientCar);
    }

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn gap={2}>
        <FormTextField name="mark" label="Марка" control={control} />
        <FormTextField name="model" label="Модель" control={control} />
        <FormTextField name="number" label="Гос. номер" control={control} />
        <FormTextField name="color" label="Цвет" control={control} />
        <FormTextField name="year" label="Год выпуска" control={control} />

        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Добавить автомобиль
        </Button>
      </StackColumn>
    </form>
  );
};
