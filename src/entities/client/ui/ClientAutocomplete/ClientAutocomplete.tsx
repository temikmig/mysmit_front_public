import { useEffect, useMemo, useRef, useState } from "react";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";

import {
  useGetClientsSearchOptionQuery,
  useGetClientsSearchQuery,
} from "@entities/client/api";
import { Client, ClientSearchOption } from "@entities/client/model";
import { useOpenClientCreateModal } from "@features/client";
import { parseClientInput } from "@shared/lib";
import { FormEntityAutocompleteField } from "@shared/ui/text-fields";

interface ClientAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  onChange?: () => void;
  onSelected?: (client: Client | null) => void;
  onClientCreated?: (client: ClientSearchOption) => void;
}

export const ClientAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
  onSelected,
  onClientCreated,
}: ClientAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<ClientSearchOption[]>([]);

  const isInitialized = useRef(false);

  const clientId = useWatch({ control, name });

  const { data: apiOptions, isLoading } = useGetClientsSearchQuery({
    search,
    limit: 20,
  });

  const options = useMemo(() => {
    const map = new Map<string, ClientSearchOption>();

    apiOptions?.forEach((o) => map.set(o.id, o));
    localOptions.forEach((o) => map.set(o.id, o));

    return Array.from(map.values());
  }, [apiOptions, localOptions]);

  const selectedOption = useMemo(
    () => options.find((o) => o.id === clientId),
    [options, clientId],
  );

  const { data: clientOption } = useGetClientsSearchOptionQuery(clientId, {
    skip: !clientId || !!selectedOption,
  });

  useEffect(() => {
    if (!clientOption) return;

    setLocalOptions((prev) => {
      if (prev.some((o) => o.id === clientOption.id)) return prev;
      return [...prev, clientOption];
    });

    onSelected?.(clientOption.object);
  }, [clientOption]);

  const openCreate = useOpenClientCreateModal({
    onSuccess: (client) => {
      setLocalOptions((prev) => [...prev, client]);

      onClientCreated?.(client);
    },
  });

  const handleChange = () => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    onChange?.();
  };

  return (
    <FormEntityAutocompleteField<T, ClientSearchOption, Client, string>
      control={control}
      name={name}
      label={label}
      options={options}
      loading={isLoading}
      onSearch={(val) => setSearch(val)}
      onChange={handleChange}
      noOptionCreate={{
        label: "Добавить клиента",
        onClick: (val: string) => {
          const parsed = parseClientInput(val);
          openCreate(parsed);
        },
      }}
      onSelected={(object) => {
        onSelected?.(object);
      }}
    />
  );
};
