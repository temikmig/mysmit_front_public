import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useWatch } from "react-hook-form";

import {
  Product,
  PRODUCT_TYPES_LABELS,
  PRODUCT_UNIT_STORAGES_LABELS,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductEditDto,
  ProductUnitStoragesEnum,
  useResourceHint,
} from "@entities/product";
import { ServiceMultipleAutocomplete } from "@entities/service";
import { enumToOptions } from "@shared/lib";
import {
  StackColumn,
  StackRow,
  FormTextField,
  FormSelectField,
  FormNumberField,
} from "@shared/ui";

import { useEditProduct, useProductEditForm } from "../../model";

interface ProductEditFormProps {
  product: Product;
  onClose?: () => void;
}

export const ProductEditForm: FC<ProductEditFormProps> = ({
  product,
  onClose,
}) => {
  const { editProduct, isLoading } = useEditProduct();

  const { control, handleSubmit, formState } = useProductEditForm(product);

  const onSubmit = async (data: ProductEditDto) => {
    await editProduct(product.id, data);
    onClose?.();
  };

  const unitStorages = useWatch({
    control,
    name: "unitStorages",
  });

  const unitUsageHint = useResourceHint({ control });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormTextField
          name="name"
          label="Наименование товара"
          control={control}
          multiline
          rows={3}
        />
        <StackRow gap={2}>
          <FormTextField
            name="shortName"
            label="Короткое наименование"
            control={control}
          />
          <FormTextField name="article" label="Артикул" control={control} />
        </StackRow>
        <StackRow gap={2}>
          <Box>
            <FormSelectField
              fullWidth
              name="type"
              label="Тип товара"
              control={control}
              options={enumToOptions(PRODUCT_TYPES_LABELS)}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            gap={1}
          >
            <Box width="100%" display="flex" gap={1}>
              <Box width="60%" display="flex" gap={1}>
                <FormSelectField
                  label="Хранение"
                  name="unitStorages"
                  control={control}
                  options={enumToOptions(PRODUCT_UNIT_STORAGES_LABELS)}
                />
                {unitStorages === ProductUnitStoragesEnum.PACKS && (
                  <FormNumberField
                    name="unitPack"
                    label="Штук в упаковке"
                    control={control}
                  />
                )}
              </Box>
              <Box width="20%">
                <FormNumberField
                  fullWidth
                  name="resourceValue"
                  label="Ресурс"
                  control={control}
                />
              </Box>
              <Box width="20%">
                <FormSelectField
                  label="Ед."
                  fullWidth
                  name="unitUsage"
                  control={control}
                  options={enumToOptions(PRODUCT_UNIT_USAGE_LABELS_SHORT)}
                />
              </Box>
            </Box>
            <Typography variant="caption">{unitUsageHint}</Typography>
          </Box>
        </StackRow>

        <ServiceMultipleAutocomplete
          label="Услуги"
          name="services"
          control={control}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Редактировать товар
        </Button>
      </StackColumn>
    </form>
  );
};
