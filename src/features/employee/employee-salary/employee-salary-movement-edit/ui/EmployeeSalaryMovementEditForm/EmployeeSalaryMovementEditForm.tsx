import { Button } from "@mui/material";
import { FC } from "react";

import {
  EmployeeSalaryMovement,
  EmployeeSalaryMovementEditDto,
} from "@entities/employee";
import { StackColumn } from "@shared/ui";
import {
  FormCheckboxField,
  FormDatePicker,
  FormNumberField,
  FormTextField,
} from "@shared/ui/text-fields";

import {
  useEditEmployeeSalaryMovement,
  useEmployeeSalaryMovementEditForm,
} from "../../model";

interface EmployeeSalaryMovementEditFormProps {
  employeeSalaryMovement: EmployeeSalaryMovement;
  onClose?: () => void;
}

export const EmployeeSalaryMovementEditForm: FC<
  EmployeeSalaryMovementEditFormProps
> = ({ employeeSalaryMovement, onClose }) => {
  const { editEmployeeSalaryMovement, isLoading } =
    useEditEmployeeSalaryMovement();

  const { control, handleSubmit, formState } =
    useEmployeeSalaryMovementEditForm(employeeSalaryMovement);

  const onSubmit = async (data: EmployeeSalaryMovementEditDto) => {
    await editEmployeeSalaryMovement(employeeSalaryMovement.id, data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormNumberField
          moneyMode
          name="amount"
          label="Сумма"
          control={control}
          min={0}
        />
        <FormDatePicker name="movementDate" label="Дата" control={control} />
        <FormCheckboxField
          name="isNotChangeBalance"
          label="Не изменять баланс"
          control={control}
        />
        <FormTextField
          name="comment"
          label="Комментарий"
          control={control}
          multiline
          rows={3}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Редактировать движение
        </Button>
      </StackColumn>
    </form>
  );
};
