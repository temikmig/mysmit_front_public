import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import { Box, Checkbox, Link, Typography } from "@mui/material";
import { useEffect, useState, memo } from "react";
import {
  Control,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

import {
  ChecklistItemsTableRow,
  ChecklistItemsTableCell,
  ChecklistServiceProduct,
} from "@entities/checklist";
import { ChecklistCreateDto } from "@entities/checklist";
import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  TIME_UNITS,
  TimeUnit,
} from "@entities/product";
import { ProductGroupSelect } from "@features/assign-product-group";
import { useAuth } from "@features/auth";
import { useOpenProductCardModal } from "@features/product";
import { isMobileRequest } from "@shared/lib";
import { NumberField } from "@shared/ui";

interface ChecklistItemRowProps {
  product: ChecklistServiceProduct;
  control: Control<ChecklistCreateDto>;
  setValue: UseFormSetValue<ChecklistCreateDto>;
  append: UseFieldArrayAppend<ChecklistCreateDto, "items">;
  remove: UseFieldArrayRemove;
  itemIndex?: number;
  serviceId?: number;
  isShowGropping?: boolean;
}

export const ChecklistItemRow = memo(
  ({
    product,
    control,
    setValue,
    append,
    remove,
    itemIndex,
    serviceId,
    isShowGropping = false,
  }: ChecklistItemRowProps) => {
    const { isAdmin } = useAuth();
    const isMobile = isMobileRequest();

    const openProduct = useOpenProductCardModal();
    const items = useWatch({ control, name: "items" });
    const workTime = useWatch({ control, name: "workTime" });

    const checked = itemIndex !== undefined;
    const item = checked ? items?.[itemIndex] : undefined;

    const [usageItem, setUsageItem] = useState(0);

    const isTimeProduct = TIME_UNITS.has(product.unitUsage as TimeUnit);

    useEffect(() => {
      if (!item || !isTimeProduct) return;

      const calculated = (item.quantityUsed ?? 0) / (workTime ?? 1);
      setUsageItem(calculated);
    }, [item?.quantityUsed, workTime, itemIndex, product.unitUsage]);

    const handleToggle = () => {
      if (!checked) {
        append({
          productId: product.id,
          quantityUsed: isTimeProduct ? workTime : 1,
          writeoffPrice: product.writeoffOnePrice,
        });
      } else {
        remove(itemIndex);
      }
    };

    const calculateWriteoff = (quantity: number) =>
      quantity * product.writeoffOnePrice;

    const handleQuantityChange = (val: number) => {
      if (itemIndex === undefined) return;
      let quantity = val;

      if (isTimeProduct) {
        quantity = val * (workTime ?? 1);
        setUsageItem(val);
      }

      setValue(`items.${itemIndex}.quantityUsed`, quantity, {
        shouldDirty: true,
      });
      setValue(
        `items.${itemIndex}.writeoffPrice`,
        calculateWriteoff(quantity),
        { shouldDirty: true },
      );
    };

    return (
      <ChecklistItemsTableRow hover selected={checked}>
        <ChecklistItemsTableCell>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            minHeight={56}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="space-between"
            gap={2}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2">
                <Link onClick={() => openProduct(product.id)}>
                  {product.name}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.shortName}
              </Typography>
              {isShowGropping && serviceId && isAdmin && (
                <Box width={200}>
                  <ProductGroupSelect
                    productId={product.id}
                    serviceId={serviceId}
                    group={product.productGroup}
                  />
                </Box>
              )}
            </Box>

            {checked && item && (
              <Box display="flex" gap={1}>
                {isTimeProduct ? (
                  <Box width={150}>
                    <NumberField
                      value={usageItem}
                      label="Кол-во"
                      min={0}
                      onChange={handleQuantityChange}
                    />
                  </Box>
                ) : (
                  <Box width={150}>
                    <NumberField
                      value={item.quantityUsed ?? 0}
                      label={PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}
                      min={0}
                      onChange={(val) => handleQuantityChange(val)}
                    />
                  </Box>
                )}
                {isAdmin && (
                  <Box width={150}>
                    <NumberField
                      value={item.writeoffPrice ?? 0}
                      label="Списание"
                      min={0}
                      moneyMode
                      icon={<CurrencyRubleIcon />}
                      onChange={(val) =>
                        setValue(`items.${itemIndex}.writeoffPrice`, val, {
                          shouldDirty: true,
                        })
                      }
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </ChecklistItemsTableCell>

        <ChecklistItemsTableCell
          width={80}
          align="right"
          sx={{ verticalAlign: "top" }}
        >
          <Checkbox checked={checked} onChange={handleToggle} />
        </ChecklistItemsTableCell>
      </ChecklistItemsTableRow>
    );
  },
);
