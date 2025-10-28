import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import {
  useGetClientCarsSearchQuery,
  useLazyGetClientCarQuery,
} from "../../../api";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { Car } from "../../../common/types";

interface ClientCarSelectorProps {
  label?: ReactNode;
  clientId: string;
  value: string | null;
  onChange: (id: string | null, car?: Car | null) => void;
  actions?: AutocompleteAction[];
  error?: boolean;
  errorMessage?: string;
}

export const ClientCarSelector = ({
  label = "Автомобиль",
  clientId,
  value,
  onChange,
  actions,
  error,
  errorMessage,
}: ClientCarSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: clientCars } = useGetClientCarsSearchQuery({
    clientId,
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchClientCar, { data: fetchedCar }] = useLazyGetClientCarQuery();
  useEffect(() => {
    if (!value) return;
    if (!clientCars?.some((c) => c.id === value)) {
      fetchClientCar(value);
    }
  }, [value, clientCars]);

  const allCars = [
    ...(clientCars || []),
    ...(fetchedCar && !clientCars?.some((c) => c.id === fetchedCar.id)
      ? [fetchedCar]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      allCars?.map((c) => ({
        label: `${c.mark} ${c.model} ${c.color} ${c.year} ${
          c.number ? `(${c.number})` : ``
        }`,
        value: c.id,
        data: c,
      })) || []
    );
  };

  return (
    <AutocompleteInput
      label={label}
      placeholder="Выберите автомобиль"
      value={value}
      onChange={(val, obj) => {
        if (!Array.isArray(obj) && obj) onChange(String(val), obj.data);
        else onChange("", null);
      }}
      fetchOptions={fetchOptions}
      actions={actions}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
