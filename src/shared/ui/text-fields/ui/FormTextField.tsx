import { TextField, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTextFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  ...textFieldProps
}: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ""}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
