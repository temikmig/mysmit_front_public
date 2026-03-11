import { Button } from "@mui/material";
import { FC } from "react";

import { SupplierCreateDto } from "@entities/supplier";
import {
  FormSection,
  StackColumn,
  FormTextField,
  FormCheckboxField,
} from "@shared/ui";

import { useCreateSupplier, useSupplierCreateForm } from "../../model";

interface SupplierCreateFormProps {
  onClose?: () => void;
}

export const SupplierCreateForm: FC<SupplierCreateFormProps> = ({
  onClose,
}) => {
  const { createSupplier, isLoading } = useCreateSupplier();

  const { control, handleSubmit, formState } = useSupplierCreateForm();

  const onSubmit = async (data: SupplierCreateDto) => {
    await createSupplier(data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormSection title="Данные контрагента">
          <StackColumn gap={2}>
            <FormTextField
              name="name"
              label="Наименование контрагента"
              control={control}
            />
            <FormTextField
              name="contactInfo"
              label="Контактная информация"
              multiline
              rows={4}
              control={control}
            />
            <FormCheckboxField
              name="isSupplier"
              label="Является поставщиком"
              control={control}
            />
          </StackColumn>
        </FormSection>
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Добавить контрагента
        </Button>
      </StackColumn>
    </form>
  );
};
