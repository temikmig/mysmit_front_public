/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import { useGetProductQuery } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./ProductCard.module.css";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import {
  AppsDeleteIcon,
  EditIcon,
  ShuffleIcon,
  TimePastIcon,
} from "../../../assets/icons";
import { IconButton } from "../../ui/IconButton";
import { ProductTypeTag } from "../ProductTypeTag";
import { ProductServiceTag } from "../ProductServiceTag";
import { PRODUCT_UNIT_USAGE_LABELS_SHORT } from "../../../common/types";
import Button from "../../ui/Button";
import { formatDateToText, moneyFormat } from "../../../common/functions";
import { useHandlers } from "../../../common/hooks";

interface ProductCardProps {
  productId: number;
  refetch?: () => void;
}

export const ProductCard = ({ productId }: ProductCardProps) => {
  const {
    handleProductWriteOff,
    handleProductBatches,
    handleProductEdit,
    handleProductWriteOffEdit,
    handleProductWriteOffHistory,
    handleProductTransferReserve,
  } = useHandlers();

  const { data: product, isLoading } = useGetProductQuery(productId);

  const mainItems: DataGridItem[] =
    (product && [
      { title: "Наименование", description: product.name },
      {
        title: "Тип",
        description: <ProductTypeTag min type={product.type} />,
      },
      { title: "Короткое наим.", description: product.shortName || undefined },
      {
        title: "Услуги",
        description:
          (product.services.length > 0 && (
            <div className={styles.productServicesCont}>
              {product.services.map((service) => (
                <ProductServiceTag key={service.id} min service={service} />
              ))}
            </div>
          )) ||
          undefined,
      },
      { title: "Артикул", description: product.article || undefined },
      {
        title: "Цена списания",
        description: (
          <>
            {`${moneyFormat(product.currentWriteoffPrice)} - 
            ${moneyFormat(
              product.currentWriteoffPrice * product.currentConversionFactor
            )}
            за 1 ${PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}`}
            <IconButton
              icon={<EditIcon />}
              variant="outline"
              onClick={() => {
                handleProductWriteOffEdit(productId);
              }}
              tooltip="Изменить цену списания"
            />
            <IconButton
              icon={<TimePastIcon />}
              variant="outline"
              onClick={() => {
                handleProductWriteOffHistory(productId);
              }}
              tooltip="История цен списания"
            />
          </>
        ),
      },
    ]) ||
    [];

  const quantityItems: DataGridItem[] =
    (product && [
      {
        title: "На складе",
        description: `${product.stockBalance.quantity} ${product.unitStorage.shortName}`,
      },
      {
        title: "Остаток ресурса",
        description: `${product.stockBalance.resourceQuantity}
            ${PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}`,
      },
      {
        title: "Накоплено",
        description: (
          <>
            {moneyFormat(product.reserveValue || 0)}{" "}
            <IconButton
              icon={<ShuffleIcon />}
              variant="outline"
              onClick={() => {
                handleProductTransferReserve(productId);
              }}
              tooltip="Переместить резерв в другой товар"
            />
          </>
        ),
      },
    ]) ||
    [];

  const batchItems: DataGridItem[] =
    (product &&
      product.lastBatch && [
        {
          title: "Дата закупки",
          description: formatDateToText(
            product.lastBatch.receivedAt,
            "date string"
          ),
        },
        {
          title: "Цена закупки",
          description: moneyFormat(product.lastBatch.price),
        },
        {
          title: "Количество",
          description: `${product.lastBatch.quantity} ${product.unitStorage.shortName}`,
        },
        {
          title: "Поставщик",
          description: product.lastBatch.supplier?.name,
        },
      ]) ||
    [];

  if (isLoading) return <LoaderPage />;

  if (product)
    return (
      <div className={styles.productCardCont}>
        <h5>Информация о товаре</h5>
        <DataGrid items={mainItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              handleProductEdit(productId);
            }}
          >
            Редактировать информацию
          </Button>
        </div>
        <h5>Остатки</h5>
        <DataGrid items={quantityItems} />
        <div className={styles.buttonsCont}>
          <Button
            icon={<AppsDeleteIcon />}
            onClick={() => {
              handleProductWriteOff(productId);
            }}
          >
            Ручное списание
          </Button>
        </div>
        <h5>Последняя закупка</h5>
        {product.lastBatch ? (
          <>
            <DataGrid items={batchItems} />{" "}
            <div className={styles.buttonsCont}>
              <Button
                icon={<TimePastIcon />}
                onClick={() => {
                  handleProductBatches(productId);
                }}
              >
                Все поступления товара
              </Button>
            </div>
          </>
        ) : (
          "Отсутствует"
        )}
      </div>
    );
};
