import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Switch,
  Table,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import { FC, Fragment, useMemo, useState } from "react";
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { useModal } from "@app/providers";
import {
  ChecklistItemsTableCell,
  ChecklistItemsTableContainer,
  ChecklistItemsTableTypeRow,
  ChecklistServiceProduct,
} from "@entities/checklist";
import { ChecklistCreateDto } from "@entities/checklist";
import {
  PRODUCT_TYPES_LABELS,
  PRODUCT_TYPES_ORDER,
  ProductType,
} from "@entities/product";
import { useAuth } from "@features/auth";
import { useChecklistDerived } from "@features/checklist";

import { ChecklistItemRow } from "./ChecklistItemRow";

interface ChecklistItemsTableProps {
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
  products: ChecklistServiceProduct[];
  isSearch?: boolean;
  title?: string;
  serviceId?: number;
}

export const ChecklistItemsTable: FC<ChecklistItemsTableProps> = ({
  control,
  setValue,
  products,
  isSearch = true,
  title,
  serviceId,
}) => {
  const { isAdmin } = useAuth();

  const { metrics } = useModal();

  const modalMaxHeight = metrics?.height;

  const { append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({
    control,
    name: "items",
  });

  const indexMap = useMemo(() => {
    const map = new Map<number, number>();
    items.forEach((f, i) => {
      map.set(f.productId, i);
    });
    return map;
  }, [items]);

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const lower = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.shortName?.toLowerCase().includes(lower),
    );
  }, [products, search]);

  const typeOrderMap = new Map(
    PRODUCT_TYPES_ORDER.map((type, index) => [type, index]),
  );

  const groupedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      const aOrder = typeOrderMap.get(a.type) ?? 999;
      const bOrder = typeOrderMap.get(b.type) ?? 999;

      return aOrder - bOrder;
    });

    return sorted.reduce<Record<string, ChecklistServiceProduct[]>>(
      (acc, product) => {
        if (!acc[product.type]) acc[product.type] = [];
        acc[product.type].push(product);
        return acc;
      },
      {},
    );
  }, [filteredProducts]);

  const [isShowGropping, setIsShowGropping] = useState(false);

  useChecklistDerived(control, setValue, products);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {title && <Typography>{title}</Typography>}
      {isSearch && (
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            fullWidth
            label="Поиск"
            placeholder="Поиск по материалам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          {isAdmin && (
            <Switch
              checked={isShowGropping}
              onChange={() => {
                setIsShowGropping((prev) => !prev);
              }}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          )}
        </Box>
      )}

      <ChecklistItemsTableContainer maxHeight={modalMaxHeight}>
        <Table size="small">
          <TableBody>
            {Object.entries(groupedProducts).map(([type, items]) => (
              <Fragment key={type}>
                <ChecklistItemsTableTypeRow>
                  <ChecklistItemsTableCell colSpan={3}>
                    {PRODUCT_TYPES_LABELS[type as ProductType]}
                  </ChecklistItemsTableCell>
                </ChecklistItemsTableTypeRow>

                {items.map((product) => (
                  <ChecklistItemRow
                    key={product.id}
                    product={product}
                    control={control}
                    serviceId={serviceId}
                    setValue={setValue}
                    append={append}
                    remove={remove}
                    itemIndex={indexMap.get(product.id)}
                    isShowGropping={isShowGropping}
                  />
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </ChecklistItemsTableContainer>
    </Box>
  );
};
