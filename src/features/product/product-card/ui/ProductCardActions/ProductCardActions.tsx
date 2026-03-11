import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Divider } from "@mui/material";
import { FC } from "react";

import { Product } from "@entities/product";
import {
  useOpenProductDeleteModal,
  useOpenProductEditModal,
} from "@features/product";
import { StackRow } from "@shared/ui";

interface ProductCardActionsProps {
  product: Product;
}
export const ProductCardActions: FC<ProductCardActionsProps> = ({
  product,
}) => {
  const openEdit = useOpenProductEditModal();
  const openDelete = useOpenProductDeleteModal(true);

  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Divider />
      <StackRow align="end">
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => openEdit(product.id)}
        >
          Редактировать
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => openDelete(product.id)}
        >
          Удалить
        </Button>
      </StackRow>
    </Box>
  );
};
