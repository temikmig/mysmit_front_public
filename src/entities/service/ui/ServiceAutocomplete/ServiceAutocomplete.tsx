import { useEffect, useMemo, useRef, useState } from "react";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";

import {
  useGetServicesSearchOptionQuery,
  useGetServicesSearchQuery,
} from "@entities/service/api";
import { Service, ServiceSearchOption } from "@entities/service/model";
import { useOpenServiceCreateModal } from "@features/service";
import { FormEntityAutocompleteField } from "@shared/ui/text-fields";

interface ServiceAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  onChange?: () => void;
  onServiceCreated?: (service: ServiceSearchOption) => void;
  onSelected?: (service: Service | null) => void;
  initialOption?: ServiceSearchOption;
}

export const ServiceAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
  onServiceCreated,
  onSelected,
}: ServiceAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<ServiceSearchOption[]>([]);

  const isInitialized = useRef(false);

  const serviceId = useWatch({ control, name });

  const { data: apiOptions, isLoading } = useGetServicesSearchQuery({
    search,
    limit: 20,
  });

  const options = useMemo(() => {
    const map = new Map<number, ServiceSearchOption>();

    apiOptions?.forEach((o) => map.set(o.id, o));
    localOptions.forEach((o) => map.set(o.id, o));

    return Array.from(map.values());
  }, [apiOptions, localOptions]);

  const selectedOption = useMemo(
    () => options.find((o) => o.id === serviceId),
    [options, serviceId],
  );

  useEffect(() => {
    if (selectedOption) {
      onSelected?.(selectedOption.object ?? null);
    }
  }, [selectedOption]);

  const { data: serviceOption } = useGetServicesSearchOptionQuery(serviceId, {
    skip: !serviceId || !!selectedOption,
  });

  useEffect(() => {
    if (!serviceOption) return;

    setLocalOptions((prev) => {
      if (prev.some((o) => o.id === serviceOption.id)) return prev;
      return [...prev, serviceOption];
    });

    onSelected?.(serviceOption.object ?? null);
  }, [serviceOption]);

  const handleChange = () => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    onChange?.();
  };

  const openCreate = useOpenServiceCreateModal({
    onSuccess: (service) => {
      setLocalOptions((prev) => [...prev, service]);

      onServiceCreated?.(service);
    },
  });

  return (
    <FormEntityAutocompleteField<T, ServiceSearchOption, Service, number>
      control={control}
      name={name}
      label={label}
      options={options}
      loading={isLoading}
      onSearch={(val) => setSearch(val)}
      onChange={handleChange}
      onSelected={(object) => {
        onSelected?.(object);
      }}
      noOptionCreate={{
        label: "Добавить услугу",
        onClick: (val: string) => {
          openCreate({ name: val });
        },
      }}
    />
  );
};
