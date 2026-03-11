import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";

import {
  Service,
  ServiceSearchOption,
  useGetServiceIdsQuery,
  useGetServicesByIdsQuery,
  useGetServicesSearchQuery,
} from "@entities/service";
import { useDebounce } from "@shared/lib";
import { FormAutocompleteField } from "@shared/ui/text-fields";

interface ServiceMultipleAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  multiple?: boolean;
}

export const ServiceMultipleAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
}: ServiceMultipleAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: options = [], isLoading } = useGetServicesSearchQuery({
    search: debouncedSearch,
    limit: 50,
  });

  const selectedIds = useWatch({
    control,
    name,
  }) as number[] | undefined;

  const { data: selectedOptions = [] } = useGetServicesByIdsQuery(
    selectedIds ?? [],
    { skip: !selectedIds?.length },
  );

  const mergedOptions = useMemo(() => {
    const map = new Map<number, ServiceSearchOption>();

    options.forEach((o) => map.set(o.id, o));
    selectedOptions.forEach((o) => map.set(o.id, o));

    return Array.from(map.values());
  }, [options, selectedOptions]);

  const { data: allIds, isFetching: isFetchingAll } = useGetServiceIdsQuery(
    { search: debouncedSearch },
    { skip: false },
  );

  return (
    <FormAutocompleteField<T, Service, number>
      name={name}
      control={control}
      label={label}
      multiple
      options={mergedOptions}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      getValue={(option) => option!.id}
      getOptionFromValue={(id) =>
        mergedOptions.find((o) => o.id === id) || null
      }
      loading={isLoading || isFetchingAll}
      onInputChange={setSearch}
      renderExtraButton={(field) => (
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => {
            if (allIds) {
              field.onChange(allIds);
            }
          }}
        >
          Добавить все
        </Button>
      )}
    />
  );
};
