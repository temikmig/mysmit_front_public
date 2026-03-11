import { Autocomplete, TextField } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";

import {
  ChecklistServiceProduct,
  useGetChecklistProductsSearchQuery,
} from "@entities/checklist";
import { ChecklistCreateDto } from "@entities/checklist";

interface ChecklistItemAddProps {
  control: Control<ChecklistCreateDto>;
  serviceId: number;
}

export const ChecklistItemAdd: FC<ChecklistItemAddProps> = ({
  control,
  serviceId,
}) => {
  const { append } = useFieldArray({
    control,
    name: "items",
  });

  const items =
    useWatch({
      control,
      name: "items",
    }) || [];

  const [selectedProduct, setSelectedProducts] =
    useState<ChecklistServiceProduct>();

  const [search, setSearch] = useState("");

  const { data: apiOptions } = useGetChecklistProductsSearchQuery({
    search,
    limit: 20,
    serviceId,
  });

  const options = useMemo(() => [...(apiOptions || [])], [apiOptions]);

  return (
    <Autocomplete
      options={options}
      value={selectedProduct || null}
      getOptionLabel={(o) => o.name}
      filterSelectedOptions
      isOptionEqualToValue={(o, v) => o.id === v.id}
      onChange={(_, value) => {
        if (!value) return;

        const alreadyExists = items.some((i) => i.productId === value.id);

        if (!alreadyExists) {
          append({
            productId: value.id,
            quantityUsed: 0,
            writeoffPrice: value.writeoffOnePrice,
          });
        }

        setSelectedProducts(undefined);
        setSearch("");
      }}
      inputValue={search}
      onInputChange={(_, val, reason) => {
        if (reason === "input") setSearch(val);
        if (reason === "clear") setSearch("");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Добавить товар в чек-лист"
          variant="filled"
          placeholder="Начните вводить наименование..."
        />
      )}
    />
  );
};
