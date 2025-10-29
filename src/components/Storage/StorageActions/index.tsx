import React from "react";
import { ProductStatusEnum, type Product } from "../../../common/types";
import {
  AppsAddIcon,
  AppsDeleteIcon,
  BadgeIcon,
  DeleteIcon,
  EyeCrossedIcon,
  EyeIcon,
} from "../../../assets/icons";
import { useHandlers, useSnackbar } from "../../../common/hooks";
import { TableActionsCont, TableAction } from "../../ui/TableActions";
import { useActiveProductMutation, useHideProductMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";

interface StorageActionsProps {
  product: Product;
}

export const StorageActions: React.FC<StorageActionsProps> = ({ product }) => {
  const { showSnackbar } = useSnackbar();
  const {
    handleProductCard,
    handlePurchaseInvoiceAdd,
    handleProductWriteOff,
    handleProductDelete,
  } = useHandlers();

  const [toActive] = useActiveProductMutation();
  const [toHide] = useHideProductMutation();

  const handleMutation = async (
    mutation: (id: number) => { unwrap: () => Promise<unknown> },
    successMsg: string,
    errorMsg: string
  ) => {
    if (!product) return;
    try {
      await mutation(product.id).unwrap();
      showSnackbar({
        title: "Сообщение",
        message: successMsg.replace("{name}", product.name),
        mode: "success",
      });
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: errorMsg.replace("{name}", product.name),
        addMessage: error.data?.msg,
        mode: "error",
      });
    }
  };

  const handleToActiveProduct = () =>
    handleMutation(
      toActive,
      "Товар {name} успешно активирован",
      "Товар {name} не может быть активирован"
    );

  const handleToHideProduct = () =>
    handleMutation(
      toHide,
      "Товар {name} успешно скрыт",
      "Товар {name} не может быть скрыт"
    );

  const actions = [
    {
      tooltip: "Карточка товара",
      icon: <BadgeIcon />,
      onClick: () => handleProductCard(product.id),
    },
    {
      tooltip: "Поступление",
      icon: <AppsAddIcon color="var(--icons-green)" />,
      onClick: () => handlePurchaseInvoiceAdd(product.id),
    },
    {
      tooltip: "Списание",
      icon: <AppsDeleteIcon color="var(--icons-red)" />,
      onClick: () => handleProductWriteOff(product.id),
    },
    product.status === ProductStatusEnum.ACTIVE
      ? {
          tooltip: "Скрыть",
          icon: <EyeCrossedIcon color="var(--icons-orange)" />,
          onClick: handleToHideProduct,
        }
      : {
          tooltip: "Активировать",
          icon: <EyeIcon color="var(--icons-orange)" />,
          onClick: handleToActiveProduct,
        },
    {
      tooltip: "Удалить",
      icon: <DeleteIcon />,
      onClick: () => handleProductDelete(product.id),
    },
  ];

  return (
    <TableActionsCont>
      {actions.map((a, i) => (
        <TableAction key={i} {...a} />
      ))}
    </TableActionsCont>
  );
};
