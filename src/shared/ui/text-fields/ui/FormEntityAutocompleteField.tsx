import { useEffect, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { useAuth } from "@features/auth";
import { useDebounce } from "@shared/lib";

import { FormAutocompleteField } from "./FormAutocompleteField";

interface FormEntityAutocompleteFieldProps<
  T extends FieldValues,
  OptionType extends { id: IdType; name: string; object?: ObjectType },
  ObjectType,
  IdType extends string | number = string,
> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  initialOption?: OptionType;
  options?: OptionType[];
  loading?: boolean;
  onSearch?: (value: string) => void;
  onChange?: () => void;
  onSelected?: (option: ObjectType | null) => void;
  customLabel?: string;
  customOnChange?: () => void;
  noOptionCreate?: {
    label: string;
    onClick: (val: string) => void;
  };
}

export const FormEntityAutocompleteField = <
  T extends FieldValues,
  OptionType extends { id: IdType; name: string; object?: ObjectType },
  ObjectType,
  IdType extends string | number = string,
>({
  control,
  name,
  label,
  initialOption,
  options: staticOptions,
  loading: staticLoading = false,
  onSearch,
  onChange,
  onSelected,
  customLabel,
  customOnChange,
  noOptionCreate,
}: FormEntityAutocompleteFieldProps<T, OptionType, ObjectType, IdType>) => {
  const { isAdmin } = useAuth();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (onSearch) onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const mergedOptions = [
    ...(initialOption ? [initialOption] : []),
    ...(staticOptions ?? []),
  ].filter(
    (option, index, self) =>
      index === self.findIndex((o) => o.id === option.id),
  );

  return (
    <FormAutocompleteField<T, ObjectType, IdType>
      control={control}
      name={name}
      label={label}
      options={mergedOptions}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      loading={staticLoading}
      onSearch={setSearch}
      getValue={(option) => option!.id}
      getOptionFromValue={(id) =>
        mergedOptions.find((o) => o.id === id) ?? null
      }
      onChange={onChange}
      onSelected={onSelected}
      customLabel={customLabel}
      customOnChange={customOnChange}
      noOptionCreate={isAdmin ? noOptionCreate : undefined}
    />
  );
};
