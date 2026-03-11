import { TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import "dayjs/locale/ru";

interface FormDatePickerProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
  datePickerProps?: Partial<Omit<DatePickerProps, "value" | "onChange">>;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  datePickerProps,
  ...textFieldProps
}: FormDatePickerProps<T>) => {
  dayjs.locale("ru");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <DatePicker
            {...datePickerProps}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date?.toDate() ?? null)}
            slotProps={{
              textField: {
                ...textFieldProps,
                variant: "filled",
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
                InputProps: {
                  sx: {
                    borderRadius: "12px",
                    overflow: "hidden",
                  },
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
