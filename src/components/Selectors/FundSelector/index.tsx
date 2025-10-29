import { useEffect, useState } from "react";
import {
  AutocompleteAction,
  AutocompleteInput,
} from "../../ui/AutocompleteInput";
import { useDebounce } from "../../../common/hooks";
import {
  useGetFundsSearchQuery,
  useGetChildFundsSearchQuery,
  useGetFundQuery,
} from "../../../api";
import { Fund } from "../../../common/types";

interface FundSelectorProps {
  label?: React.ReactNode;
  value: string | null;
  onChange: (fundId: string | null) => void;
  actions?: AutocompleteAction[];
  error?: boolean;
  errorMessage?: string;
}

export const FundSelector = ({
  label,
  value,
  onChange,
  actions,
  error,
  errorMessage,
}: FundSelectorProps) => {
  const [selectedParent, setSelectedParent] = useState<Fund | null>(null);
  const [searchParent, setSearchParent] = useState("");
  const [searchChild, setSearchChild] = useState("");

  const debouncedSearchParent = useDebounce(searchParent, 300);
  const debouncedSearchChild = useDebounce(searchChild, 300);

  const { data: parentFunds } = useGetFundsSearchQuery({
    search: debouncedSearchParent,
  });

  const { data: childFunds } = useGetChildFundsSearchQuery(
    {
      parentId: selectedParent?.id ?? "",
      search: debouncedSearchChild,
    },
    { skip: !selectedParent }
  );

  const { data: currentFund } = useGetFundQuery(value ?? "", {
    skip: !value,
  });

  useEffect(() => {
    if (currentFund) {
      if (currentFund.parentId && currentFund.parent) {
        setSelectedParent(currentFund.parent);
      } else {
        setSelectedParent(currentFund);
      }
    }
  }, [currentFund]);

  useEffect(() => {
    if (!selectedParent) onChange(null);
  }, [selectedParent]);

  const fetchParentOptions = async (query: string) => {
    setSearchParent(query);
    return (
      parentFunds?.map((f) => ({ label: f.name, value: f.id, data: f })) || []
    );
  };

  const fetchChildOptions = async (query: string) => {
    setSearchChild(query);
    return (
      childFunds?.map((f) => ({ label: f.name, value: f.id, data: f })) || []
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Родитель */}
      <AutocompleteInput
        label={label}
        placeholder="Выберите фонд"
        value={selectedParent?.id ?? ""}
        onChange={(val, obj) => {
          if (!Array.isArray(obj) && obj) {
            const fund = obj.data as Fund;
            setSelectedParent(fund);
            if (!fund.children?.length) {
              onChange(fund.id);
            } else {
              onChange(null);
            }
          } else {
            setSelectedParent(null);
          }
        }}
        fetchOptions={fetchParentOptions}
        actions={actions}
        error={error}
        errorMessage={errorMessage}
      />
      {selectedParent &&
        (selectedParent.children?.length > 0 ||
          currentFund?.parentId === selectedParent.id) && (
          <AutocompleteInput
            label="Подфонд"
            placeholder="Выберите подфонд"
            value={value ?? ""}
            onChange={(val, obj) => {
              if (!Array.isArray(obj) && obj) {
                const fund = obj.data as Fund;
                onChange(fund.id);
              } else {
                onChange(null);
              }
            }}
            fetchOptions={fetchChildOptions}
          />
        )}
    </div>
  );
};
