import { Chip } from "@mui/material";
import { FC } from "react";

import {
  PRODUCT_TYPES_COLORS,
  PRODUCT_TYPES_LABELS,
  ProductType,
} from "@entities/product";
import { getContrastColor } from "@shared/lib";

interface ProductTypeBadgeProps {
  productType: ProductType;
}

export const ProductTypeBadge: FC<ProductTypeBadgeProps> = ({
  productType,
}) => {
  const label = PRODUCT_TYPES_LABELS[productType];
  const color = PRODUCT_TYPES_COLORS[productType];

  return (
    <Chip
      label={label}
      sx={{
        background: color,
        color: getContrastColor(color),
      }}
    />
  );
};
