import { useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useGetSourcesSearchQuery, useLazyGetSourceQuery } from "../../../api";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { MoneySource } from "../../../common/types";

interface SourceSelectorProps {
  label?: React.ReactNode;
  value: string | null;
  onChange: (id: string | null, source?: MoneySource | null) => void;
  actions?: AutocompleteAction[];
  error?: boolean;
  errorMessage?: string;
}

export const SourceSelector = ({
  label = "Источник списания",
  value,
  onChange,
  actions,
  error,
  errorMessage,
}: SourceSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: sources } = useGetSourcesSearchQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchSource, { data: fetchedSource }] = useLazyGetSourceQuery();

  useEffect(() => {
    if (value && !sources?.some((s) => s.id === value)) {
      fetchSource(value);
    }
  }, [value, sources]);

  const allSources = [
    ...(sources || []),
    ...(fetchedSource && !sources?.some((s) => s.id === fetchedSource.id)
      ? [fetchedSource]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      allSources?.map((s) => ({
        label: s.name,
        value: s.id,
        data: s,
      })) || []
    );
  };

  return (
    <AutocompleteInput
      label={label}
      placeholder="Выберите источник"
      value={value}
      onChange={(val, obj) => {
        if (!Array.isArray(obj) && obj) onChange(String(val), obj.data);
        else onChange(null, null);
      }}
      fetchOptions={fetchOptions}
      actions={actions}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
