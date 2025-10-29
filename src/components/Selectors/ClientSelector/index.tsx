import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useGetClientsSearchQuery, useLazyGetClientQuery } from "../../../api";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { Client } from "../../../common/types";

interface ClientSelectorProps {
  label?: ReactNode;
  value: string | null;
  onChange: (id: string | null, client?: Client | null) => void;
  actions?: AutocompleteAction[];
  error?: boolean;
  errorMessage?: string;
}

export const ClientSelector = ({
  label = "Клиент",
  value,
  onChange,
  actions,
  error,
  errorMessage,
}: ClientSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: clients } = useGetClientsSearchQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchClient, { data: fetchedClient }] = useLazyGetClientQuery();

  useEffect(() => {
    if (!value) return;
    if (!clients?.some((c) => c.id === value)) {
      fetchClient(value);
    }
  }, [value, clients]);

  const allClients = [
    ...(clients || []),
    ...(fetchedClient && !clients?.some((c) => c.id === fetchedClient.id)
      ? [fetchedClient]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      allClients?.map((c) => ({
        label: `${c.firstName} ${c.lastName}`,
        value: c.id,
        data: c,
      })) || []
    );
  };

  return (
    <AutocompleteInput
      label={label}
      placeholder="Выберите клиента"
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
