import { Button } from "@mui/material";
import { FC } from "react";

import { Supplier, SupplierEditDto } from "@entities/supplier";
import { FormSection, StackColumn } from "@shared/ui";
import { FormCheckboxField, FormTextField } from "@shared/ui/text-fields";

import { useEditSupplier, useSupplierEditForm } from "../../model";

interface SupplierEditFormProps {
  supplier: Supplier;
  onClose?: () => void;
}

export const SupplierEditForm: FC<SupplierEditFormProps> = ({
  supplier,
  onClose,
}) => {
  const { editSupplier, isLoading } = useEditSupplier();

  const { control, handleSubmit, formState } = useSupplierEditForm(supplier);

  const onSubmit = async (data: SupplierEditDto) => {
    await editSupplier(supplier.id, data);
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
          Редактировать контрагента
        </Button>
      </StackColumn>
    </form>
  );
};
