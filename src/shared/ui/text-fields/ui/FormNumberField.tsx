import { TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { NumberField } from "@shared/ui";
interface FormNumberFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
  min?: number;
  max?: number;
  icon?: ReactNode;
  step?: number;
  moneyMode?: boolean;
  disabled?: boolean;
}

export const FormNumberField = <T extends FieldValues>({
  name,
  label,
  control,
  min,
  max,
  icon,
  step = 1,
  moneyMode = false,
  disabled = false,
}: FormNumberFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        min:
          min !== undefined
            ? { value: min, message: `Минимум ${min}` }
            : undefined,
        max:
          max !== undefined
            ? { value: max, message: `Максимум ${max}` }
            : undefined,
      }}
      render={({ field: { value, onChange }, fieldState }) => (
        <NumberField
          value={value ?? undefined}
          onChange={onChange}
          label={label}
          icon={icon}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          min={min}
          max={max}
          step={step}
          moneyMode={moneyMode}
          disabled={disabled}
        />
      )}
    />
  );
};
