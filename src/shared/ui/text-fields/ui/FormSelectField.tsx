import { TextField, TextFieldProps, MenuItem } from "@mui/material";
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  PathValue,
} from "react-hook-form";

interface Option<T> {
  label: string;
  value: T;
}

interface FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<TextFieldProps, "name" | "select"> {
  name: TName;
  control: Control<TFieldValues>;
  options: Option<PathValue<TFieldValues, TName>>[];
}

export function FormSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  options,
  ...textFieldProps
}: FormSelectProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          select
          value={field.value ?? ""}
          onChange={(e) =>
            field.onChange(e.target.value === "" ? null : e.target.value)
          }
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {options.map((option) => (
            <MenuItem key={String(option.value)} value={option.value ?? ""}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
