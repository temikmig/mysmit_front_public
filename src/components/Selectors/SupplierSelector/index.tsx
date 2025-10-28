import { useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import {
  useGetSuppliersSearchQuery,
  useLazyGetSupplierQuery,
} from "../../../api/suppliersApi";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { Supplier } from "../../../common/types";

interface SupplierSelectorProps {
  label?: React.ReactNode;
  value: number | null;
  onChange: (id: number | null, supplier?: Supplier | null) => void;
  actions?: AutocompleteAction[];
  error?: boolean;
  errorMessage?: string;
}

export const SupplierSelector = ({
  label = "Поставщик",
  value,
  onChange,
  actions,
  error,
  errorMessage,
}: SupplierSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data: suppliers } = useGetSuppliersSearchQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchSupplier, { data: fetchedSupplier }] = useLazyGetSupplierQuery();

  useEffect(() => {
    if (value && !suppliers?.some((s) => s.id === value)) {
      fetchSupplier(value);
    }
  }, [value, suppliers]);

  const allSuppliers = [
    ...(suppliers || []),
    ...(fetchedSupplier && !suppliers?.some((s) => s.id === fetchedSupplier.id)
      ? [fetchedSupplier]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return allSuppliers.map((s) => ({
      label: s.name,
      value: s.id,
      data: s,
    }));
  };

  return (
    <AutocompleteInput
      label={label}
      placeholder="Выберите поставщика"
      value={value}
      onChange={(val, obj) => {
        if (!Array.isArray(obj) && obj) onChange(Number(val), obj.data);
        else onChange(null, null);
      }}
      fetchOptions={fetchOptions}
      actions={actions}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
