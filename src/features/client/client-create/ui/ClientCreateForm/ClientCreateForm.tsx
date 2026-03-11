import { Button } from "@mui/material";
import { FC } from "react";

import {
  CLIENT_SEX_LABELS,
  ClientCreateDto,
  ClientSearchOption,
  LOYALTY_CARD_LEVEL_LABELS,
} from "@entities/client";
import { ClientSourceAutocomplete } from "@entities/clientSource";
import { enumToOptions } from "@shared/lib";
import {
  FormSection,
  StackColumn,
  StackRow,
  FormDatePicker,
  FormPhoneField,
  FormTextField,
  FormSelectField,
} from "@shared/ui";

import { useClientCreateForm, useCreateClient } from "../../model";

interface ClientCreateFormProps {
  onClose?: () => void;
  onSuccess?: (client: ClientSearchOption) => void;
  initial?: Partial<ClientCreateDto>;
}

export const ClientCreateForm: FC<ClientCreateFormProps> = ({
  onClose,
  onSuccess,
  initial,
}) => {
  const { createClient, isLoading } = useCreateClient();

  const { control, handleSubmit, formState, setValue } =
    useClientCreateForm(initial);

  const onSubmit = async (data: ClientCreateDto) => {
    const newClient = await createClient(data);

    if (newClient) {
      onSuccess?.(newClient);
    }

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormSection title="Данные клиента">
          <StackRow gap={2}>
            <FormTextField name="firstName" label="Имя" control={control} />
            <FormTextField name="lastName" label="Фамилия" control={control} />
            <FormDatePicker
              name="birthday"
              label="Дата рождения"
              control={control}
            />
          </StackRow>
          <StackRow gap={2}>
            <FormPhoneField name="phone" label="Телефон" control={control} />
            <FormSelectField
              name="sex"
              label="Пол"
              control={control}
              options={enumToOptions(CLIENT_SEX_LABELS)}
            />
          </StackRow>
        </FormSection>
        <FormSection title="Карта лояльности">
          <StackRow gap={2}>
            <FormSelectField
              name="loyaltyСardLevel"
              label="Карта лояльности"
              control={control}
              options={enumToOptions(LOYALTY_CARD_LEVEL_LABELS, true)}
            />
            {formState.dirtyFields.loyaltyСardLevel && (
              <FormTextField
                name="loyaltyСardNum"
                label="Номер карты лояльности"
                control={control}
              />
            )}
          </StackRow>
        </FormSection>
        <FormSection title="Автомобиль">
          <StackRow gap={2}>
            <FormTextField
              name="carMark"
              label="Марка автомобиля"
              control={control}
            />
            <FormTextField
              name="carModel"
              label="Модель автомобиля"
              control={control}
            />
            <FormTextField
              name="carYear"
              label="Год выпуска"
              control={control}
            />
          </StackRow>
          <StackRow gap={2}>
            <FormTextField
              name="carColor"
              label="Цвет автомобиля"
              control={control}
            />
            <FormTextField
              name="carNumber"
              label="Гос. номер автомобиля"
              control={control}
            />
          </StackRow>
        </FormSection>
        <FormSection title="Дополнительно">
          <ClientSourceAutocomplete
            control={control}
            label="Источник клиента"
            name="clientSourceId"
            onClientSourceCreated={(clientSource) => {
              setValue("clientSourceId", clientSource.id, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </FormSection>
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Добавить клиента
        </Button>
      </StackColumn>
    </form>
  );
};
