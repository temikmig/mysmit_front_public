import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import {
  useGetEmployeesSearchQuery,
  useLazyGetEmployeeQuery,
} from "../../../api";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { Employee } from "../../../common/types";

interface EmployeeSelectorProps {
  label?: ReactNode;
  value: string | string[];
  onChange: (ids: string[], employees?: Employee[]) => void;
  multiple?: boolean;
  actions?: AutocompleteAction[];
  itemCont?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export const EmployeeSelector = ({
  label = "Сотрудник",
  value,
  onChange,
  multiple = false,
  actions,
  itemCont = true,
  error,
  errorMessage,
}: EmployeeSelectorProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: employees } = useGetEmployeesSearchQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const [fetchEmployee, { data: fetchedEmployee }] = useLazyGetEmployeeQuery();

  useEffect(() => {
    if (!value) return;

    const values = Array.isArray(value) ? value : [value];
    for (const id of values) {
      if (!employees?.some((e) => e.id === id)) {
        fetchEmployee(id);
      }
    }
  }, [value, employees]);

  const allEmployees = [
    ...(employees || []),
    ...(fetchedEmployee && !employees?.some((e) => e.id === fetchedEmployee.id)
      ? [fetchedEmployee]
      : []),
  ];

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      allEmployees?.map((s) => ({
        label: `${s.firstName} ${s.lastName}`,
        value: s.id,
        data: s,
      })) || []
    );
  };

  return (
    <AutocompleteInput
      multiple={multiple}
      label={label}
      placeholder="Выберите сотрудника"
      value={value}
      onChange={(val, obj) => {
        const selected =
          Array.isArray(obj) && obj.length ? obj.map((o) => o.data) : undefined;
        onChange(val as string[], selected);
      }}
      fetchOptions={fetchOptions}
      actions={actions}
      itemCont={itemCont}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
