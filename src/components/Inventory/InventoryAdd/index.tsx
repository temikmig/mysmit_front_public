import * as yup from "yup";
import { useState, FormEvent } from "react";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import {
  useAddInventoryMutation,
  useGetProductsByTypeQuery,
} from "../../../api";
import {
  ProductType,
  PRODUCT_TYPES_LABELS,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  Product,
} from "../../../common/types";
import Button from "../../ui/Button";
import { Select } from "../../ui/Select";
import Input from "../../ui/Input";
import styles from "./InventoryAdd.module.css";
import { ApiError } from "../../../api/baseQuery";
import { DeleteIcon } from "../../../assets/icons";
import clsx from "clsx";
import { InventoryDiffWrap } from "../InventoryDiffWrap";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { ClickLink } from "../../ui/ClickLink";
import { useForm, useHandlers } from "../../../common/hooks";
import { DatePicker } from "../../ui/DatePicker";

interface InventoryAddProps {
  onSuccess: () => void;
}

export const InventoryAdd = ({ onSuccess }: InventoryAddProps) => {
  const { showSnackbar } = useSnackbar();
  const [addInventory, { isLoading: isLoadingAdd }] = useAddInventoryMutation();

  const { handleProductCard } = useHandlers();

  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const { data: productsByType, isLoading: isLoadingProducts } =
    useGetProductsByTypeQuery(selectedType!, { skip: !selectedType });

  const [inventoryItems, setInventoryItems] = useState<
    {
      productId: number;
      countedQty: number;
      diffWriteOffPrice: number;
      resourceQty: number;
      diffWriteOffOnePrice: number;
    }[]
  >([]);

  const [allProductsMap, setAllProductsMap] = useState<Record<number, Product>>(
    {}
  );

  const updateItem = (
    idx: number,
    changes: Partial<(typeof inventoryItems)[0]>
  ) =>
    setInventoryItems((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...changes };
      return copy;
    });

  const removeItem = (productId: number) => {
    setInventoryItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleAddToInventory = () => {
    if (!productsByType || productsByType.length === 0) {
      showSnackbar({
        title: "Ошибка",
        message: "Нет доступных товаров для этого типа",
        mode: "error",
      });
      return;
    }

    setInventoryItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.productId));

      const newItems = productsByType
        .filter((p) => !existingIds.has(p.id))
        .map((p) => ({
          productId: p.id,
          countedQty: p.stockBalance.quantity,
          resourceQty: p.stockBalance.resourceQuantity,
          diffWriteOffPrice: 0,
          diffWriteOffOnePrice: 0,
        }));

      if (newItems.length === 0) {
        showSnackbar({
          title: "Информация",
          message: "Все товары этого типа уже добавлены",
          mode: "info",
        });
        return prev;
      }

      // сохраняем все добавленные продукты в map
      setAllProductsMap((prevMap) => {
        const newMap = { ...prevMap };
        productsByType.forEach((p) => {
          newMap[p.id] = p;
        });
        return newMap;
      });

      return [...prev, ...newItems];
    });
  };

  const schema = yup.object({
    createdAt: yup.date().required("Укажите дату инвентаризации"),
  });

  const form = useForm(
    {
      createdAt: null,
    },
    schema
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addInventory({
        inventoryDate: (form.values.createdAt || new Date()).toISOString(),
        items: inventoryItems.map((i) => ({
          productId: i.productId,
          countedQty: i.countedQty,
          countedResourceQty: i.resourceQty,
          diffWriteOffPrice: i.diffWriteOffPrice,
          diffWriteOffOnePrice: i.diffWriteOffOnePrice,
        })),
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: "Инвентаризация успешно создана",
        mode: "success",
      });
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: "Возникла ошибка при создании инвентаризации",
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inventoryAddCont}>
      <div className={styles.inventoryHeadCont}>
        <div style={{ width: "20%" }}>
          <DatePicker
            value={form.values.createdAt}
            onChange={(date) => form.setFieldValue("createdAt", date)}
            label="Дата"
            error={Boolean(form.fieldErrors.createdAt)}
            errorMessage={form.fieldErrors.createdAt}
          />
        </div>
        <div style={{ flex: "1" }}>
          <Select
            label="Тип товара"
            value={selectedType || ""}
            options={Object.entries(PRODUCT_TYPES_LABELS).map(
              ([key, label]) => ({
                value: key,
                label,
              })
            )}
            onChange={(val) => setSelectedType(val as ProductType)}
          />
        </div>
        <Button
          type="button"
          onClick={handleAddToInventory}
          disabled={isLoadingProducts}
        >
          Добавить в список
        </Button>
      </div>

      {inventoryItems.length > 0 && (
        <table className={clsx("shadow-container", styles.inventoryList)}>
          <tbody>
            {inventoryItems.map((item, idx) => {
              const product = allProductsMap[item.productId];
              if (!product) return null;

              const diffQuantity =
                item.countedQty - product.stockBalance.quantity;
              const diffWriteOffPrice =
                diffQuantity * product.currentWriteoffPrice;

              const diffResourceQuantity =
                item.resourceQty - product.stockBalance.resourceQuantity;
              const diffWriteOffOnePrice =
                diffResourceQuantity * product.writeoffOnePrice;

              return (
                <tr key={item.productId} className={styles.inventoryItem}>
                  <td>
                    <ClickLink
                      onClick={() => {
                        handleProductCard(product.id);
                      }}
                    >
                      {product.name}
                    </ClickLink>
                  </td>
                  <td style={{ width: 150 }}>
                    <div className={styles.oneLineCont}>
                      <Input
                        type="number"
                        name="countedQty"
                        value={item.countedQty}
                        onChange={(e) =>
                          updateItem(idx, {
                            countedQty: Number(e.target.value),
                            diffWriteOffPrice:
                              (Number(e.target.value) -
                                product.stockBalance.quantity) *
                              product.currentWriteoffPrice,
                          })
                        }
                      />
                      <p className="text_medium">
                        {product.unitStorage.shortName}
                      </p>
                    </div>
                  </td>
                  <td className={styles.diffCol}>
                    <InventoryDiffWrap
                      diff={diffQuantity}
                      diffLabel={product.unitStorage.shortName}
                    />
                    <InventoryDiffWrap diff={diffWriteOffPrice} diffLabel="₽" />
                  </td>
                  <td style={{ width: 150 }}>
                    <div className={styles.oneLineCont}>
                      <Input
                        type="number"
                        name="resourceQty"
                        value={item.resourceQty}
                        onChange={(e) =>
                          updateItem(idx, {
                            resourceQty: Number(e.target.value),
                            diffWriteOffOnePrice:
                              (Number(e.target.value) -
                                product.stockBalance.resourceQuantity) *
                              product.writeoffOnePrice,
                          })
                        }
                      />
                      <p className="text_medium">
                        {PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}
                      </p>
                    </div>
                  </td>
                  <td className={styles.diffCol}>
                    <InventoryDiffWrap
                      diff={diffResourceQuantity}
                      diffLabel={
                        PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]
                      }
                    />
                    <InventoryDiffWrap
                      diff={diffWriteOffOnePrice}
                      diffLabel="₽"
                    />
                  </td>
                  <td className={styles.actionCol}>
                    <Button
                      type="button"
                      icon={<DeleteIcon />}
                      onClick={() => removeItem(item.productId)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className={styles.buttonsCont}>
        <Button
          type="submit"
          disabled={inventoryItems.length === 0 || isLoadingAdd}
        >
          Создать инвентаризацию
        </Button>
      </div>
      <LoaderBlur isLoading={isLoadingAdd} />
    </form>
  );
};
