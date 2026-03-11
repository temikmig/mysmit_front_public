import { TextField, MenuItem } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { useGetProductUnitsStorageQuery } from "@entities/product/api";

interface ProductUnitStorageSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  fullWidth?: boolean;
}

export const ProductUnitStorageSelect = <T extends FieldValues>({
  control,
  name,
  label,
  fullWidth = false,
}: ProductUnitStorageSelectProps<T>) => {
  const { data, isLoading } = useGetProductUnitsStorageQuery();

  const options =
    data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <TextField
            select
            label={label}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={isLoading || !options.length}
            fullWidth={fullWidth}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
