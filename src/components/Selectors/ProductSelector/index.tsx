import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import {
  useGetProductsSearchQuery,
  useLazyGetProductQuery,
} from "../../../api";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { Product } from "../../../common/types";

interface ProductSelectorProps {
  label?: ReactNode;
  value: number | null;
  onChange: (id: number | null, product?: Product | null) => void;
  actions?: AutocompleteAction[];
  error?: boolean;
  errorMessage?: string;
}

export const ProductSelector = ({
  label = "Товар",
  value,
  onChange,
  actions,
  error,
  errorMessage,
}: ProductSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data: products } = useGetProductsSearchQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchProduct, { data: fetchedProduct }] = useLazyGetProductQuery();

  useEffect(() => {
    if (value && !products?.some((p) => p.id === value)) {
      fetchProduct(value);
    }
  }, [value, products]);

  const allProducts = [
    ...(products || []),
    ...(fetchedProduct && !products?.some((p) => p.id === fetchedProduct.id)
      ? [fetchedProduct]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      allProducts?.map((p) => ({
        label: p.name,
        value: p.id,
        data: p,
      })) || []
    );
  };

  return (
    <AutocompleteInput
      label={label}
      placeholder="Выберите товар"
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
