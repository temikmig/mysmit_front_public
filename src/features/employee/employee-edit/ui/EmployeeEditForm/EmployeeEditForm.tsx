import { Button } from "@mui/material";
import { FC } from "react";

import { Employee, EmployeeEditDto } from "@entities/employee";
import { ServiceMultipleAutocomplete } from "@entities/service";
import { StackColumn, FormSection, StackRow } from "@shared/ui";
import { FormPhoneField, FormTextField } from "@shared/ui/text-fields";

import { useEditEmployee, useEmployeeEditForm } from "../../model";

interface EmployeeEditFormProps {
  employee: Employee;
  onClose?: () => void;
}

export const EmployeeEditForm: FC<EmployeeEditFormProps> = ({
  employee,
  onClose,
}) => {
  const { editEmployee, isLoading } = useEditEmployee();

  const { control, handleSubmit, formState, watch } =
    useEmployeeEditForm(employee);

  const onSubmit = async (data: EmployeeEditDto) => {
    await editEmployee(employee.id, data);
    onClose?.();
  };

  console.log(watch());
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
          Редактировать сотрудника
        </Button>
      </StackColumn>
    </form>
  );
};
