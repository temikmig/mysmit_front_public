import { ReactNode, useState } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useGetServicesSearchQuery } from "../../../api/servicesApi";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import type { Service } from "../../../common/types";
import { AngleRightMinIcon, CrossSmallIcon } from "../../../assets/icons";

interface BaseProps {
  label?: ReactNode;
  actions?: AutocompleteAction[];
  keepOpenOnSelect?: boolean;
  valueLabelsMap?: Record<number, string>;
  error?: boolean;
  errorMessage?: string;
}

interface SingleServiceSelectorProps extends BaseProps {
  mode: "single";
  value: number;
  onChange: (id: number | null, service?: Service) => void;
}

interface MultipleServiceSelectorProps extends BaseProps {
  mode: "multiple";
  value: number[];
  onChange: (ids: number[], services?: Service[]) => void;
}

type ServiceSelectorProps =
  | SingleServiceSelectorProps
  | MultipleServiceSelectorProps;

interface Option<T> {
  label: string;
  value: number;
  data: T;
}

export const ServiceSelector = (props: ServiceSelectorProps) => {
  const {
    label,
    value,
    onChange,
    mode,
    actions,
    keepOpenOnSelect,
    valueLabelsMap = {},
    error,
    errorMessage,
  } = props;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data: services } = useGetServicesSearchQuery({
    search: debouncedSearch,
  });

  const fetchOptions = async (query: string) => {
    setSearch(query);
    return (
      services?.map((s) => ({ label: s.name || "", value: s.id, data: s })) ||
      []
    );
  };

  const renderLabel = (id: number, option?: { label?: string }) =>
    valueLabelsMap[id] || option?.label || id;

  const handleSelectAll = () => {
    if (services && services.length && mode === "multiple") {
      const allValues = services.map((s) => s.id); // number[]
      const allOptions = services.map((s) => s); // Service[]
      onChange(allValues, allOptions);
    }
  };

  const handleClearAll = () => {
    if (mode === "multiple") {
      onChange([], []);
    }
  };

  const actionItems = [
    ...(actions || []),
    mode === "multiple"
      ? {
          label: "Выбрать все",
          icon: <AngleRightMinIcon />,
          onClick: handleSelectAll,
        }
      : null,
    mode === "multiple" && Array.isArray(value) && value.length > 0
      ? {
          label: "Убрать все",
          icon: <CrossSmallIcon />,
          onClick: handleClearAll,
        }
      : null,
  ].filter(Boolean) as AutocompleteAction[];

  return (
    <AutocompleteInput
      multiple={mode === "multiple"}
      label={label}
      placeholder="Выберите услугу"
      value={value}
      onChange={(val, obj) => {
        if (mode === "multiple") {
          const selected =
            Array.isArray(obj) && obj.length
              ? (obj as Option<Service>[]).map((o) => o.data)
              : undefined;
          onChange(val as number[], selected);
        } else {
          if (!Array.isArray(obj) && obj) {
            const newVal = val === "" ? null : Number(val);
            onChange(newVal, (obj as Option<Service>).data);
          } else {
            onChange(null, undefined);
          }
        }
      }}
      fetchOptions={fetchOptions}
      actions={actionItems}
      renderLabel={renderLabel}
      keepOpenOnSelect={keepOpenOnSelect}
      error={error}
      errorMessage={errorMessage}
    />
  );
};
