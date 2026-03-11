import {
  Autocomplete,
  TextField,
  TextFieldProps,
  CircularProgress,
  Box,
  Checkbox,
  createFilterOptions,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect, ReactNode } from "react";
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";

import { useDebounce } from "@shared/lib";

interface OptionWithId<ObjectType, IdType extends string | number = string> {
  id: IdType;
  name: string;
  subtitle?: string;
  object?: ObjectType;
}

interface FormAutocompleteFieldProps<
  T extends FieldValues,
  ObjectType,
  IdType extends string | number = string,
> extends Omit<TextFieldProps, "name"> {
  name: FieldPath<T>;
  control: Control<T>;
  options: OptionWithId<ObjectType, IdType>[];
  onChange?: () => void;
  onSelected?: (object: ObjectType | null) => void;
  getOptionLabel?: (
    option: OptionWithId<ObjectType, IdType> | string,
  ) => string;
  freeSolo?: boolean;
  loading?: boolean;
  multiple?: boolean;
  onSearch?: (value: string) => void;
  onInputChange?: (value: string) => void;
  getValue?: (option: OptionWithId<ObjectType, IdType> | null) => IdType;
  getOptionFromValue?: (
    value: IdType,
  ) => OptionWithId<ObjectType, IdType> | null;
  renderExtraButton?: (field: ControllerRenderProps<T>) => ReactNode;
  customLabel?: string;
  customOnChange?: () => void;
  noOptionCreate?: {
    label: string;
    onClick: (val: string) => void;
  };
}

export const FormAutocompleteField = <
  T extends FieldValues,
  ObjectType,
  IdType extends string | number = string,
>({
  name,
  control,
  options,
  onChange,
  onSelected,
  getOptionLabel,
  freeSolo = false,
  loading = false,
  multiple = false,
  onSearch,
  getValue,
  getOptionFromValue,
  onInputChange,
  renderExtraButton,
  customLabel,
  customOnChange,
  noOptionCreate,
  ...textFieldProps
}: FormAutocompleteFieldProps<T, ObjectType, IdType>) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInput = useDebounce(inputValue, 300);

  const filter = createFilterOptions<OptionWithId<ObjectType, IdType>>();

  const CUSTOM_OPTION_ID = "__custom__";

  useEffect(() => {
    if (onSearch) onSearch(debouncedInput);
  }, [debouncedInput, onSearch]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const mappedValue = ():
          | OptionWithId<ObjectType, IdType>
          | OptionWithId<ObjectType, IdType>[]
          | null => {
          if (multiple) {
            if (!Array.isArray(field.value)) return [];

            if (!getOptionFromValue)
              return field.value as OptionWithId<ObjectType, IdType>[];

            return (field.value as IdType[])
              .map((val: IdType) => getOptionFromValue(val))
              .filter((v): v is OptionWithId<ObjectType, IdType> => v !== null);
          }

          if (getOptionFromValue && field.value != null) {
            return getOptionFromValue(field.value as IdType);
          }

          return (field.value as OptionWithId<ObjectType, IdType>) ?? null;
        };

        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            gap={1}
          >
            <Autocomplete
              clearText="Очистить"
              sx={{ width: "100%" }}
              multiple={multiple}
              freeSolo={freeSolo}
              options={options}
              value={mappedValue()}
              inputValue={multiple || freeSolo ? inputValue : undefined}
              disableCloseOnSelect={multiple}
              clearOnEscape
              // readOnly
              onInputChange={(_, value, reason) => {
                if (reason === "input") {
                  setInputValue(value);

                  if (!multiple) {
                    field.onChange(null);
                  }
                }

                if (onInputChange) onInputChange(value);
                onChange?.();
              }}
              onChange={(_, option) => {
                if (
                  customLabel &&
                  customOnChange &&
                  option &&
                  (option as OptionWithId<ObjectType, IdType>).id ===
                    CUSTOM_OPTION_ID
                ) {
                  setInputValue("");
                  if (!multiple) {
                    field.onChange(null);
                  }
                  customOnChange();

                  return;
                }

                if (multiple) {
                  if (getValue) {
                    field.onChange(
                      (option as OptionWithId<ObjectType, IdType>[]).map(
                        (opt) => getValue(opt),
                      ),
                    );
                  } else {
                    field.onChange(option);
                  }
                } else {
                  if (!option) {
                    field.onChange(null);
                    onSelected?.(null);
                    return;
                  }

                  if (getValue) {
                    field.onChange(
                      getValue(option as OptionWithId<ObjectType, IdType>),
                    );
                  } else {
                    field.onChange(option);
                  }

                  onSelected?.(
                    (option as OptionWithId<ObjectType, IdType>).object ?? null,
                  );
                }

                onChange?.();
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (customLabel && customOnChange) {
                  return [
                    {
                      id: CUSTOM_OPTION_ID as IdType,
                      name: customLabel,
                    } as OptionWithId<ObjectType, IdType>,
                    ...filtered,
                  ];
                }

                return filtered;
              }}
              getOptionLabel={(option) => {
                if (typeof option === "string") return option;
                if (getOptionLabel) return String(getOptionLabel(option));
                return String(option.id);
              }}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;

                return (
                  <li key={key} {...rest}>
                    {multiple && (
                      <Checkbox
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        checked={selected}
                      />
                    )}
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography>{option.name}</Typography>
                      {option.subtitle && (
                        <Typography variant="subtitle1" color="gray">
                          {option.subtitle}
                        </Typography>
                      )}
                    </Box>
                  </li>
                );
              }}
              isOptionEqualToValue={(option, value) => {
                if (option.id === CUSTOM_OPTION_ID) return false;
                return (
                  option.id === (value as OptionWithId<ObjectType, IdType>)?.id
                );
              }}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...textFieldProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              noOptionsText={
                noOptionCreate && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      noOptionCreate.onClick(inputValue);
                    }}
                  >
                    {noOptionCreate.label} "{inputValue}"
                  </Button>
                )
              }
            />
            {multiple &&
              options.length > 0 &&
              renderExtraButton &&
              renderExtraButton(field)}
          </Box>
        );
      }}
    />
  );
};
