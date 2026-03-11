import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";

import {
  Product,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductUnitStoragesEnum,
  ProductUnitUsageEnum,
} from "@entities/product/model";
import { ServiceBadge } from "@entities/service";
import { useAuth } from "@features/auth";
import { useOpenProductWriteOffPriceEditModal } from "@features/product/product-writeoffprice-edit";
import { formatMinutes, moneyFormat, thousandFormat } from "@shared/lib";
import { ExpandableBox, InfoGroup } from "@shared/ui";

import { ProductTypeBadge } from "../ProductTypeBadge";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const { isAdmin } = useAuth();

  const openEditWriteOffPrice = useOpenProductWriteOffPriceEditModal();
  return (
    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
      <InfoGroup
        items={[
          { label: "Наименование", value: product.name },
          {
            label: "Короткое наименование",
            value: product.shortName,
            replacement: "Не указано",
          },
          {
            label: "Артикул",
            value: product.article,
            replacement: "Не указан",
          },
        ]}
        columns={1}
      />

      <InfoGroup
        items={[
          {
            label: "Тип",
            value: <ProductTypeBadge productType={product.type} />,
          },
          {
            label: `Услуги${product.services.length > 1 ? ` (${product.services.length})` : ""}`,
            value: (
              <ExpandableBox maxCollapsedHeight={40}>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {product.services.map((service) => (
                    <ServiceBadge
                      key={service.name}
                      service={service}
                      openService
                    />
                  ))}
                </Box>
              </ExpandableBox>
            ),
            replacement: "Не указаны",
          },
          {
            label: "Базовый ресурс",
            value: (
              <Box>
                {product.unitStorages === ProductUnitStoragesEnum.PACKS && (
                  <Typography>{`1 упаковка = ${product.unitPack} шт = ${thousandFormat(product.resourceValue)} ${
                    PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]
                  } ${
                    product.unitUsage === ProductUnitUsageEnum.MINUTES
                      ? ` (${formatMinutes(product.resourceValue)})`
                      : ""
                  }`}</Typography>
                )}
                <Typography>
                  {`1 шт = ${thousandFormat(product.resourceValue / (product.unitPack ?? 1))} ${
                    PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]
                  } ${
                    product.unitUsage === ProductUnitUsageEnum.MINUTES
                      ? ` (${formatMinutes(product.resourceValue / (product.unitPack ?? 1))})`
                      : ""
                  }`}
                </Typography>
              </Box>
            ),
          },
          {
            label: "Цена списания",
            value: (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>{`${moneyFormat(product.currentWriteoffPrice)} - 
          ${moneyFormat(product.currentWriteoffPrice * product.currentConversionFactor)}
          за 1 ${PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}`}</Typography>
                {isAdmin && (
                  <IconButton
                    title="Редактировать цену списания"
                    onClick={() => openEditWriteOffPrice(product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
            ),
          },
        ]}
        columns={1}
      />
    </Box>
  );
};
