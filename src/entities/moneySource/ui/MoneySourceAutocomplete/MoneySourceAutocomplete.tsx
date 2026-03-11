import { useMemo, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { useGetMoneySourcesSearchQuery } from "@entities/moneySource";
import { MoneySource } from "@entities/moneySource/model";
import { FormEntityAutocompleteField } from "@shared/ui/text-fields";

interface MoneySourceAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  onChange?: () => void;
  initialOption?: MoneySource;
}

export const MoneySourceAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
  initialOption,
}: MoneySourceAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");

  const { data: apiOptions, isLoading } = useGetMoneySourcesSearchQuery({
    search,
    limit: 20,
  });

  const options = useMemo(() => [...(apiOptions || [])], [apiOptions]);

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
    />
  );
};
