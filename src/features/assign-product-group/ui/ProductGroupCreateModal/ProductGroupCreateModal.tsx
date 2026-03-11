import { Button } from "@mui/material";
import { FC } from "react";

import {
  ProductGroup,
  useCreateProductGroup,
  useProductGroupCreateForm,
  ProductGroupCreateDto,
} from "@features/assign-product-group";
import { StackColumn, FormTextField } from "@shared/ui";
import { ColorPicker } from "@shared/ui/color-picker";

interface ProductGroupCreateModalProps {
  serviceId: number;
  closeModal?: () => void;
  onSuccess?: (productGroup: ProductGroup) => void;
}

export const ProductGroupCreateModal: FC<ProductGroupCreateModalProps> = ({
  serviceId,
  closeModal,
  onSuccess,
}) => {
  const { createProductGroup, isLoading } = useCreateProductGroup();

  const { control, handleSubmit, formState } =
    useProductGroupCreateForm(serviceId);

  const onSubmit = async (data: ProductGroupCreateDto) => {
    const newClient = await createProductGroup(data);

    if (newClient) {
      onSuccess?.(newClient);
    }

    closeModal?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackColumn>
        <FormTextField name="name" label="Имя" control={control} />
        <ColorPicker
          name="color"
          label="Цвет группы"
          textField={false}
          control={control}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          Создать группу
        </Button>
      </StackColumn>
    </form>
  );
};
