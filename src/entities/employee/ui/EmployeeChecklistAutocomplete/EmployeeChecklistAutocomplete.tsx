import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { EmployeeSearchOption } from "@entities/employee/model";

import { EmployeeChecklistField } from "./EmployeeChecklistField";

interface EmployeeChecklistAutocompleteProps<T extends FieldValues> {
  onEmployeeCreated?: (employee: EmployeeSearchOption) => void;
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  salary: number;
}

export const EmployeeChecklistAutocomplete = <T extends FieldValues>({
  control,
  name,
  salary,
  label,
  onEmployeeCreated,
}: EmployeeChecklistAutocompleteProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <EmployeeChecklistField
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          value={field.value}
          onChange={field.onChange}
          salary={salary}
          label={label}
          onEmployeeCreated={onEmployeeCreated}
        />
      )}
    />
  );
};
