import { Button } from "@mui/material";
import { FC } from "react";

import { Car, ClientCarEditDto } from "@entities/client";
import { StackColumn } from "@shared/ui";
import { FormTextField } from "@shared/ui/text-fields";

import { useClientCarEditForm, useEditClientCar } from "../../model";

interface ClientCarEditFormProps {
  clientCar: Car;
  onClose?: () => void;
}

export const ClientCarEditForm: FC<ClientCarEditFormProps> = ({
  clientCar,
  onClose,
}) => {
  const { editClientCar, isLoading } = useEditClientCar();

  const { control, handleSubmit, formState } = useClientCarEditForm(clientCar);

  const onSubmit = async (data: ClientCarEditDto) => {
    await editClientCar(clientCar.id, data);
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
          Редактировать автомобиль
        </Button>
      </StackColumn>
    </form>
  );
};
