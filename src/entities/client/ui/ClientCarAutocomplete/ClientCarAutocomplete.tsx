import { useEffect, useMemo, useRef, useState } from "react";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";

import {
  useGetClientCarsSearchOptionQuery,
  useGetClientCarsSearchQuery,
} from "@entities/client/api";
import { Car, ClientCarSearchOption } from "@entities/client/model";
import { useOpenClientCarCreateModal } from "@features/client";
import { parseClientCarInput } from "@shared/lib/parseClientCarInput";
import { FormEntityAutocompleteField } from "@shared/ui/text-fields";

interface ClientCarAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  onChange?: () => void;
  clientId: string;
  onSelected?: (car: Car | null) => void;
  onClientCarCreated?: (car: ClientCarSearchOption) => void;
}

export const ClientCarAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
  clientId,
  onSelected,
  onClientCarCreated,
}: ClientCarAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<ClientCarSearchOption[]>([]);

  const isInitialized = useRef(false);

  const clientCarId = useWatch({ control, name });

  const { data: apiOptions, isLoading } = useGetClientCarsSearchQuery(
    {
      search,
      limit: 20,
      clientId,
    },
    { skip: !clientId },
  );

  const options = useMemo(() => {
    const map = new Map<string, ClientCarSearchOption>();

    apiOptions?.forEach((o) => map.set(o.id, o));
    localOptions.forEach((o) => map.set(o.id, o));

    return Array.from(map.values());
  }, [apiOptions, localOptions]);

  const selectedOption = useMemo(
    () => options.find((o) => o.id === clientCarId),
    [options, clientCarId],
  );

  const { data: clientCarOption } = useGetClientCarsSearchOptionQuery(
    clientCarId,
    {
      skip: !clientCarId || !!selectedOption,
    },
  );

  useEffect(() => {
    if (!clientCarOption) return;

    setLocalOptions((prev) => {
      if (prev.some((o) => o.id === clientCarOption.id)) return prev;
      return [...prev, clientCarOption];
    });

    onSelected?.(clientCarOption.object);
  }, [clientCarOption]);

  const openCreate = useOpenClientCarCreateModal(clientId, {
    onSuccess: (clientCar) => {
      setLocalOptions((prev) => [...prev, clientCar]);

      onClientCarCreated?.(clientCar);
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
    <FormEntityAutocompleteField<T, ClientCarSearchOption, Car, string>
      control={control}
      name={name}
      label={label}
      options={options}
      loading={isLoading}
      onSearch={(val) => setSearch(val)}
      onChange={handleChange}
      noOptionCreate={{
        label: "Добавить автомобиль",
        onClick: (val: string) => {
          const parsed = parseClientCarInput(val);
          openCreate(parsed);
        },
      }}
      onSelected={(object) => {
        onSelected?.(object);
      }}
    />
  );
};
