import { useMemo, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { useGetEmployeesSearchQuery } from "@entities/employee/api";
import { EmployeeSearchOption } from "@entities/employee/model";
import { useOpenEmployeeCreateModal } from "@features/employee";
import { FormEntityAutocompleteField } from "@shared/ui/text-fields";

interface EmployeeAutocompleteProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  onChange?: () => void;
  onEmployeeCreated?: (client: EmployeeSearchOption) => void;
  initialOption?: EmployeeSearchOption;
}

export const EmployeeAutocomplete = <T extends FieldValues>({
  control,
  name,
  label,
  onChange,
  onEmployeeCreated,
  initialOption,
}: EmployeeAutocompleteProps<T>) => {
  const [search, setSearch] = useState("");
  const [localOptions, setLocalOptions] = useState<EmployeeSearchOption[]>([]);

  const { data: apiOptions, isLoading } = useGetEmployeesSearchQuery({
    search,
    limit: 20,
  });

  const options = useMemo(
    () => [...(apiOptions || []), ...localOptions],
    [apiOptions, localOptions],
  );

  const openCreate = useOpenEmployeeCreateModal({
    onSuccess: (client) => {
      setLocalOptions((prev) => [...prev, client]);

      onEmployeeCreated?.(client);
    },
  });

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
      customLabel="Добавить сотрудника"
      customOnChange={openCreate}
    />
  );
};
