import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import {
  useGetClientSourcesSearchQuery,
  useLazyGetClientSourceQuery,
} from "../../../api";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { ClientSource } from "../../../common/types";

interface ClientSourceSelectorProps {
  label?: ReactNode;
  value: string | null;
  onChange: (id: string | null, clientSource?: ClientSource | null) => void;
  actions?: AutocompleteAction[];
  valueLabel?: string;
  error?: boolean;
  errorMessage?: string;
}

export const ClientSourceSelector = ({
  label = "Источник клиента",
  value,
  onChange,
  actions,
  valueLabel,
  error,
  errorMessage,
}: ClientSourceSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: clientSources } = useGetClientSourcesSearchQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchClientSource, { data: fetchedClientSource }] =
    useLazyGetClientSourceQuery();

  useEffect(() => {
    if (!value) return;
    if (!clientSources?.some((s) => s.id === value)) {
      fetchClientSource(value);
    }
  }, [value, clientSources]);

  const allClientSources = [
    ...(clientSources || []),
    ...(fetchedClientSource &&
    !clientSources?.some((s) => s.id === fetchedClientSource.id)
      ? [fetchedClientSource]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      allClientSources?.map((s) => ({
        label: s.name,
        value: s.id,
        data: s,
      })) || []
    );
  };

  return (
    <AutocompleteInput
      label={label}
      placeholder="Выберите источник клиента"
      value={value}
      onChange={(val, obj) => {
        if (!Array.isArray(obj) && obj) onChange(String(val), obj.data);
        else onChange("", null);
      }}
      fetchOptions={fetchOptions}
      actions={actions}
      inputValueProp={valueLabel}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
