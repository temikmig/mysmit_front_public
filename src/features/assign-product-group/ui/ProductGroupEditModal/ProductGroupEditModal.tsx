import { Button } from "@mui/material";
import { FC } from "react";

import {
  ProductGroup,
  useEditProductGroup,
  ProductGroupEditDto,
  useProductGroupEditForm,
} from "@features/assign-product-group";
import { useProductGroup } from "@features/assign-product-group/model/useProductGroup";
import { StackColumn, FormTextField, Loader } from "@shared/ui";
import { ColorPicker } from "@shared/ui/color-picker";

interface ProductGroupEditModalProps {
  groupId: number;
  closeModal?: () => void;
}

export const ProductGroupEditModal: FC<ProductGroupEditModalProps> = ({
  groupId,
  closeModal,
}) => {
  const { productGroup, isLoading } = useProductGroup(groupId);

  if (isLoading || !productGroup) return <Loader />;

  return (
    <ProductGroupEditForm productGroup={productGroup} onClose={closeModal} />
  );
};

interface ProductGroupEditFormProps {
  productGroup: ProductGroup;
  onClose?: () => void;
  onSuccess?: (productGroup: ProductGroup) => void;
}

const ProductGroupEditForm: FC<ProductGroupEditFormProps> = ({
  productGroup,
  onClose,
}) => {
  const { editProductGroup, isLoading } = useEditProductGroup();

  const { control, handleSubmit, formState } =
    useProductGroupEditForm(productGroup);

  const onSubmit = async (data: ProductGroupEditDto) => {
    await editProductGroup(productGroup.id, data);

    onClose?.();
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
          Редактировать группу
        </Button>
      </StackColumn>
    </form>
  );
};
