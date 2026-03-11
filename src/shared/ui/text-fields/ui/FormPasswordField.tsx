import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

import { PasswordField } from "./PasswordField";

interface FormPasswordFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
}

export const FormPasswordField = <T extends FieldValues>({
  name,
  control,
  label,
}: FormPasswordFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <PasswordField
          {...field}
          label={label}
          value={field.value ?? ""}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
