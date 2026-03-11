import { TextField, TextFieldProps } from "@mui/material";
import { InputBaseComponentProps } from "@mui/material/InputBase";
import React from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface FormPhoneInputProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
}

const PhoneMask = React.forwardRef<HTMLInputElement, InputBaseComponentProps>(
  function PhoneMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="+7(000)-000-0000"
        inputRef={ref}
        overwrite
        onAccept={(value: string) => {
          if (onChange) {
            onChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      />
    );
  },
);

export const FormPhoneField = <T extends FieldValues>({
  name,
  control,
  ...textFieldProps
}: FormPhoneInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: string) =>
          value.replace(/\D/g, "").length === 11 ||
          "Введите корректный номер телефона",
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ""}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            inputComponent: PhoneMask,
          }}
        />
      )}
    />
  );
};
