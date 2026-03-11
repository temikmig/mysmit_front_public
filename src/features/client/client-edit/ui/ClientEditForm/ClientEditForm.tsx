import { Button } from "@mui/material";
import { FC } from "react";
import { useWatch } from "react-hook-form";

import {
  Client,
  CLIENT_SEX_LABELS,
  ClientEditDto,
  LOYALTY_CARD_LEVEL_LABELS,
} from "@entities/client";
import { ClientSourceAutocomplete } from "@entities/clientSource";
import { enumToOptions } from "@shared/lib";
import { StackColumn, FormSection, StackRow } from "@shared/ui";
import {
  FormDatePicker,
  FormPhoneField,
  FormSelectField,
  FormTextField,
} from "@shared/ui/text-fields";

import { useClientEditForm, useEditClient } from "../../model";

interface ClientEditFormProps {
  client: Client;
  onClose?: () => void;
}

export const ClientEditForm: FC<ClientEditFormProps> = ({
  client,
  onClose,
}) => {
  const { editClient, isLoading } = useEditClient();

  const { control, handleSubmit, formState, setValue } =
    useClientEditForm(client);

  const onSubmit = async (data: ClientEditDto) => {
    await editClient(client.id, data);
    onClose?.();
  };

  const loyaltyLevel = useWatch({
    control,
    name: "loyaltyСardLevel",
  });

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
            {loyaltyLevel !== null && (
              <FormTextField
                name="loyaltyСardNum"
                label="Номер карты лояльности"
                control={control}
              />
            )}
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
          Редактировать клиента
        </Button>
      </StackColumn>
    </form>
  );
};
