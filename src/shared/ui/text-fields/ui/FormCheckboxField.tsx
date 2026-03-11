import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues> extends Omit<
  CheckboxProps,
  "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
}

export const FormCheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
  ...checkboxProps
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              {...checkboxProps}
              {...field}
              checked={!!field.value}
              onChange={(e, checked) => field.onChange(checked)}
            />
          }
        />
      )}
    />
  );
};
