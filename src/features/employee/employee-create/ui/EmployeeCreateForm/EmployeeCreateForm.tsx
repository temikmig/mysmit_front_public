import { Button } from "@mui/material";
import { FC } from "react";

import { EmployeeCreateDto, EmployeeSearchOption } from "@entities/employee";
import { ServiceMultipleAutocomplete } from "@entities/service";
import {
  FormSection,
  StackColumn,
  StackRow,
  FormTextField,
  FormPhoneField,
} from "@shared/ui";

import { useCreateEmployee, useEmployeeSourceCreateForm } from "../../model";

interface EmployeeCreateFormProps {
  onClose?: () => void;
  onSuccess?: (clientSource: EmployeeSearchOption) => void;
}

export const EmployeeCreateForm: FC<EmployeeCreateFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const { createEmployee, isLoading } = useCreateEmployee();

  const { control, handleSubmit, formState } = useEmployeeSourceCreateForm();

  const onSubmit = async (data: EmployeeCreateDto) => {
    const newEmployee = await createEmployee(data);

    if (newEmployee) {
      onSuccess?.(newEmployee);
    }

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormSection title="Данные сотрудника">
          <StackRow gap={2}>
            <FormTextField name="firstName" label="Имя" control={control} />
            <FormTextField name="lastName" label="Фамилия" control={control} />
            <FormPhoneField name="phone" label="Телефон" control={control} />
          </StackRow>
        </FormSection>
        <ServiceMultipleAutocomplete
          label="Услуги"
          name="services"
          control={control}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Добавить сотрудника
        </Button>
      </StackColumn>
    </form>
  );
};
