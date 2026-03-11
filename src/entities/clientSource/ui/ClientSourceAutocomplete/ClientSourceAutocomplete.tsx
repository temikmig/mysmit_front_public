import { useMemo, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  ClientSource,
  ClientSourceSearchOption,
  useGetClientSourcesSearchQuery,
} from "@entities/clientSource";
import { useOpenClientSourceCreateModal } from "@features/client-source";
import { FormEntityAutocompleteField } from "@shared/ui/text-fields";

interface ClientSourceAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  onChange?: () => void;
  onClientSourceCreated?: (clientSource: ClientSourceSearchOption) => void;
  initialOption?: ClientSource;
}

export const ClientSourceAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
  onClientSourceCreated,
  initialOption,
}: ClientSourceAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<ClientSourceSearchOption[]>(
    [],
  );

  const { data: apiOptions, isLoading } = useGetClientSourcesSearchQuery({
    search,
    limit: 20,
  });

  const options = useMemo(
    () => [...(apiOptions || []), ...localOptions],
    [apiOptions, localOptions],
  );

  const openCreate = useOpenClientSourceCreateModal({
    onSuccess: (clientSource) => {
      setLocalOptions((prev) => [...prev, clientSource]);

      onClientSourceCreated?.(clientSource);
    },
  });

  return (
    <FormEntityAutocompleteField
      control={control}
      name={name}
      label={label}
      initialOption={initialOption}
      options={options}
      loading={isLoading}
      onSearch={(val) => setSearch(val)}
      onChange={onChange}
      customLabel="Добавить источник клиента"
      customOnChange={openCreate}
    />
  );
};
