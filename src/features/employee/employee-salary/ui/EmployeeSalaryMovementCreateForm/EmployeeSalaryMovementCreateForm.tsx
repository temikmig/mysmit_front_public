import { Box, Button } from "@mui/material";
import { FC } from "react";

import {
  EmployeeSalaryMovementCreateDto,
  EmployeeSalaryMovementType,
} from "@entities/employee";
import {
  FormCheckboxField,
  FormDatePicker,
  FormNumberField,
  FormTextField,
} from "@shared/ui";

import {
  useAutoSetIsChangeBalanceByDate,
  useCreateEmployeeSalaryMovement,
  useEmployeeSalaryCreateMovementForm,
} from "../../model";

interface EmployeeSalaryMovementCreateFormProps {
  employeeId: string;
  actionType: EmployeeSalaryMovementType;
  onSuccess?: (newBalance: number) => void;
}

export const EmployeeSalaryMovementCreateForm: FC<
  EmployeeSalaryMovementCreateFormProps
> = ({ employeeId, actionType, onSuccess }) => {
  const { control, handleSubmit, formState, reset, setValue } =
    useEmployeeSalaryCreateMovementForm(employeeId, actionType ?? "INCREASE");
  const { createEmployeeSalaryMovement, isLoading } =
    useCreateEmployeeSalaryMovement();

  const onSubmit = async (data: EmployeeSalaryMovementCreateDto) => {
    const result = await createEmployeeSalaryMovement(data);
    reset();
    if (onSuccess && result?.newSalary != null) {
      onSuccess(result.newSalary);
    }
  };

  useAutoSetIsChangeBalanceByDate<EmployeeSalaryMovementCreateDto>({
    control,
    setValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
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
        <Button
          variant="contained"
          color={actionType === "INCREASE" ? "success" : "error"}
          type="submit"
          disabled={isLoading || !formState.isValid}
        >
          {actionType === "INCREASE" ? "Пополнить" : "Списать"}
        </Button>
      </Box>
    </form>
  );
};
