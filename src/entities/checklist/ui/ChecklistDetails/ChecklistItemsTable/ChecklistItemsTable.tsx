import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Link,
  Switch,
  Table,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import { FC, Fragment, useMemo, useState } from "react";

import { ChecklistItem } from "@entities/checklist/model";
import {
  PRODUCT_TYPES_LABELS,
  PRODUCT_TYPES_ORDER,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductType,
  ProductUnitUsageEnum,
} from "@entities/product";
import { ProductGroupSelect } from "@features/assign-product-group";
import { useAuth } from "@features/auth";
import { useOpenProductCardModal } from "@features/product";
import { moneyFormat } from "@shared/lib";
import { BoxColumn } from "@shared/ui";

import {
  ChecklistItemsTableContainer,
  ChecklistItemsTableTypeRow,
  ChecklistItemsTableCell,
  ChecklistItemsTableRow,
} from "./ChecklistItemsTable.styled";

interface ChecklistItemsTableProps {
  checklistItems: ChecklistItem[];
  serviceId: number;
  maxHeight?: number;
}

export const ChecklistItemsTable: FC<ChecklistItemsTableProps> = ({
  checklistItems,
  serviceId,
  maxHeight,
}) => {
  const { isAdmin } = useAuth();

  const openProduct = useOpenProductCardModal();

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return checklistItems;
    const lower = search.toLowerCase();
    return checklistItems.filter(
      (c) =>
        c.product.name.toLowerCase().includes(lower) ||
        c.product.shortName?.toLowerCase().includes(lower),
    );
  }, [checklistItems, search]);

  const typeOrderMap = new Map(
    PRODUCT_TYPES_ORDER.map((type, index) => [type, index]),
  );

  const groupedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      const aOrder = typeOrderMap.get(a.product.type) ?? 999;
      const bOrder = typeOrderMap.get(b.product.type) ?? 999;

      return aOrder - bOrder;
    });

    return sorted.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
      if (!acc[item.product.type]) acc[item.product.type] = [];
      acc[item.product.type].push(item);
      return acc;
    }, {});
  }, [filteredProducts]);

  const [isShowGropping, setIsShowGropping] = useState(false);

  if (checklistItems.length === 0) return null;

  return (
    <BoxColumn>
      <Box display="flex" alignItems="center" gap={1}>
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
      <ChecklistItemsTableContainer maxHeight={maxHeight}>
        <Table size="small">
          <TableBody>
            {Object.entries(groupedProducts).map(([type, items]) => (
              <Fragment key={type}>
                <ChecklistItemsTableTypeRow>
                  <ChecklistItemsTableCell colSpan={2}>
                    {PRODUCT_TYPES_LABELS[type as ProductType]}
                  </ChecklistItemsTableCell>
                  <ChecklistItemsTableCell align="right" width={100}>
                    Кол-во
                  </ChecklistItemsTableCell>
                  {isAdmin && (
                    <ChecklistItemsTableCell align="right" width={100}>
                      Затраты
                    </ChecklistItemsTableCell>
                  )}
                </ChecklistItemsTableTypeRow>

                {items.map((checklistItem) => (
                  <Fragment key={checklistItem.product.name}>
                    <ChecklistItemsTableRow hover>
                      <ChecklistItemsTableCell width={5}>
                        <CheckBoxIcon fontSize="large" color="primary" />
                      </ChecklistItemsTableCell>
                      <ChecklistItemsTableCell>
                        <Box
                          display="flex"
                          minHeight={56}
                          alignItems="center"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <Box display="flex" flexDirection="column" gap={1}>
                            <Typography variant="body2">
                              <Link
                                onClick={() =>
                                  openProduct(checklistItem.product.id)
                                }
                              >
                                {checklistItem.product.name}
                              </Link>
                            </Typography>
                            {checklistItem.product.shortName && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {checklistItem.product.shortName}
                              </Typography>
                            )}
                            {isShowGropping && isAdmin && (
                              <Box width={200}>
                                <ProductGroupSelect
                                  productId={checklistItem.product.id}
                                  serviceId={serviceId}
                                  group={checklistItem.product.productGroup}
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </ChecklistItemsTableCell>
                      <ChecklistItemsTableCell align="right">
                        {checklistItem.product.unitUsage ===
                        ProductUnitUsageEnum.MINUTES
                          ? `${checklistItem.usageItem} шт`
                          : `${checklistItem.quantityUsed} ${PRODUCT_UNIT_USAGE_LABELS_SHORT[checklistItem.product.unitUsage]}`}
                      </ChecklistItemsTableCell>
                      {isAdmin && (
                        <ChecklistItemsTableCell align="right">
                          {moneyFormat(checklistItem.writeoffPrice)}
                        </ChecklistItemsTableCell>
                      )}
                    </ChecklistItemsTableRow>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </ChecklistItemsTableContainer>
    </BoxColumn>
  );
};
