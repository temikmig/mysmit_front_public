import { useEffect, useState, type MouseEvent } from "react";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import * as yup from "yup";
import {
  useCreatePurchaseInvoiceMutation,
  useLazyGetProductQuery,
} from "../../../api";
import { Select } from "../../ui/Select";
import {
  BadgeIcon,
  DeleteIcon,
  PlusMinIcon,
  RubleIcon,
} from "../../../assets/icons";
import clsx from "clsx";
import { DatePicker } from "../../ui/DatePicker";
import {
  formatDateToText,
  moneyFormat,
  roundUp,
} from "../../../common/functions";
import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  type ProductForm,
  type PurchaseInvoiceInput,
} from "../../../common/types";
import type { Product } from "../../../common/types";
import { useHandlers } from "../../../common/hooks";
import { IconButton } from "../../ui/IconButton";
import {
  FundSelector,
  ProductSelector,
  SourceSelector,
  SupplierSelector,
} from "../../Selectors";

import styles from "./PurchaseInvoicesAdd.module.css";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { DataGrid } from "../../ui/DataGrid";
import { ProductServiceTag, ProductTypeTag } from "../../Products";
import LoaderPage from "../../ui/LoaderPage";
import { Textarea } from "../../ui/Textarea";

interface PurchaseInvoicesAddProps {
  onSuccess: () => void;
  productId?: number;
}

export const PurchaseInvoicesAdd = ({
  onSuccess,
  productId,
}: PurchaseInvoicesAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [persentInflation, setPersentInflation] = useState(1.1);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [triggerGetProduct, { isLoading: isLoadingProduct }] =
    useLazyGetProductQuery();

  const {
    handleProductCard,
    handleSupplierAdd,
    handleProductAdd,
    handleSupplierCard,
  } = useHandlers();

  const [createPurchaseInvoice, { isLoading: isLoadingCreatePurchaseInvoice }] =
    useCreatePurchaseInvoiceMutation();

  const [productsList, setProductsList] = useState<ProductForm[]>([]);
  const [productInputKey, setProductInputKey] = useState(0);

  const schema = yup.object({
    productId: yup.number().notRequired(),
    createdAt: yup.date().required("Выберите дату закупки"),
    sourceId: yup.string().required("Укажите источник списания"),
    conversionFactor: yup.number().required(),
    supplierId: yup.number().required("Укажите поставщика"),
    supplierName: yup.string().required(),
    supplierContactInfo: yup.string().notRequired(),
    fundId: yup.string().notRequired(),
    price: yup.number().required("Укажите цену закупки"),
    quantity: yup
      .number()
      .required("Укажите количество")
      .moreThan(0, "Количество должно быть положительным"),
    currentWriteoffPrice: yup.number().required("Укажите цену списания"),
    comment: yup.string().notRequired(),
  });

  const form = useForm(
    {
      productId: undefined,
      createdAt: undefined,
      sourceId: "",
      supplierId: undefined,
      fundId: "",
      price: 0,
      quantity: 1,
      currentWriteoffPrice: 0,
      conversionFactor: 1,
      supplierName: "",
      supplierContactInfo: "",
      comment: "",
    },
    schema
  );

  const handleAddProduct = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await schema
        .pick(["productId", "quantity", "price", "currentWriteoffPrice"])
        .validate(form.values, { abortEarly: false });

      if (!selectedProduct) {
        showSnackbar({
          title: "Ошибка",
          message: "Выберите товар перед добавлением",
          mode: "error",
        });
        return;
      }

      const exists = productsList.some(
        (p) => p.productId === selectedProduct.id
      );
      if (exists) {
        showSnackbar({
          title: "Ошибка",
          message: "Этот товар уже добавлен в накладную",
          mode: "error",
        });
        return;
      }

      setProductsList((prev) => [
        ...prev,
        {
          productId: selectedProduct.id,
          name: selectedProduct!.name,
          type: selectedProduct!.type,
          unitStorageId: selectedProduct!.unitStorage.id,
          unitStorageDisplay: selectedProduct!.unitStorage.shortName,
          unitUsage: selectedProduct!.unitUsage,
          conversionFactor: selectedProduct!.currentConversionFactor ?? 1,
          quantity: form.values.quantity ?? 1,
          price: form.values.price ?? 0,
          currentWriteoffPrice: form.values.currentWriteoffPrice ?? 0,
          fundId: form.values.fundId || undefined,
        },
      ]);
      showSnackbar({
        title: "Сообщение",
        message: "Товар добавлен в накладную",
        mode: "success",
        duration: 1500,
      });

      setProductInputKey((prev) => prev + 1);
      setSelectedProduct(null);
      form.resetForm([
        "supplierId",
        "supplierName",
        "supplierContactInfo",
        "createdAt",
        "sourceId",
      ]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      showSnackbar({
        title: "Ошибка",
        message: "Заполните все обязательные поля бля",
        mode: "error",
        duration: 1500,
      });
    }
  };

  const handleCancelAddProduct = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setProductInputKey((prev) => prev + 1);
    form.resetForm([
      "supplierId",
      "supplierName",
      "supplierContactInfo",
      "createdAt",
      "sourceId",
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    setProductsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitInvoice = async () => {
    if (!productsList.length) return;

    const payload: PurchaseInvoiceInput = {
      supplierId: form.values.supplierId || undefined,
      createdAt: (form.values.createdAt || new Date()).toISOString(),
      sourceId: form.values.sourceId || undefined,
      comment: form.values.comment || undefined,
      items: productsList.map((p) => ({
        productId: p.productId,
        conversionFactor: p.conversionFactor,
        quantity: p.quantity,
        price: p.price,
        currentWriteoffPrice: p.currentWriteoffPrice,
        fundId: p.fundId || undefined,
      })),
    };

    try {
      await createPurchaseInvoice(payload).unwrap();
      showSnackbar({
        title: "Готово",
        message: "Накладная оформлена",
        mode: "success",
        duration: 1500,
      });
      form.resetForm();
      onSuccess();
      setProductsList([]);
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: "Не удалось оформить накладную",
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      form.setFieldValue("productId", productId);
      try {
        const product = await triggerGetProduct(productId).unwrap();
        setSelectedProduct(product);
      } catch (err) {
        console.error("Не удалось получить продукт", err);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!selectedProduct) return;
    form.setFieldValue(
      "conversionFactor",
      selectedProduct.currentConversionFactor
    );
  }, [selectedProduct]);

  useEffect(() => {
    if (form.values.price) {
      const writeoffPrice = roundUp(form.values.price * persentInflation);
      form.setFieldValue("currentWriteoffPrice", Number(writeoffPrice));
    }
  }, [form.values.price, persentInflation]);

  let totalPrice = 0;

  return (
    <div className={styles.movementInCont}>
      <form className={styles.formCont}>
        <div className={clsx(styles.oneLineCont, styles.purchaceInfo)}>
          <div style={{ width: "30%" }}>
            <DatePicker
              value={form.values.createdAt}
              onChange={(date) => form.setFieldValue("createdAt", date)}
              label="Дата закупки"
              error={Boolean(form.fieldErrors.createdAt)}
              errorMessage={form.fieldErrors.createdAt}
            />
          </div>
          <div
            className={clsx(styles.oneLineCont, styles.bottom)}
            style={{ width: "40%" }}
          >
            <SupplierSelector
              label="Поставщик"
              value={form.values.supplierId || null}
              onChange={(id, supplier) => {
                form.setFieldValue("supplierId", id);
                form.setFieldValue("supplierName", supplier?.name || null);
                form.setFieldValue(
                  "supplierContactInfo",
                  supplier?.contactInfo || null
                );
              }}
              actions={[
                {
                  label: "Добавить поставщика",
                  icon: <PlusMinIcon />,
                  onClick: (currentInput) => {
                    handleSupplierAdd((supplier) => {
                      if (!supplier) return;
                      form.setFieldValue("supplierId", supplier.id);
                      form.setFieldValue(
                        "supplierName",
                        supplier?.name || null
                      );
                      form.setFieldValue(
                        "supplierContactInfo",
                        supplier?.contactInfo || null
                      );
                    }, currentInput as string);
                  },
                },
              ]}
              error={Boolean(form.fieldErrors.supplierId)}
              errorMessage={form.fieldErrors.supplierId}
            />

            {form.values.supplierId && (
              <IconButton
                size="big"
                tooltip="Карточка поставщика"
                icon={<BadgeIcon />}
                variant="outline"
                onClick={() => {
                  if (form.values.supplierId)
                    handleSupplierCard(form.values.supplierId);
                }}
              />
            )}
          </div>
          <div style={{ width: "30%" }}>
            <SourceSelector
              label="Источник списания"
              value={form.values.sourceId || null}
              onChange={(val) => form.setFieldValue("sourceId", val)}
              error={Boolean(form.fieldErrors.sourceId)}
              errorMessage={form.fieldErrors.sourceId}
            />
          </div>
        </div>
        <Textarea
          label="Комментарий"
          placeholder="Укажите комментарий"
          name="comment"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.comment)}
          errorMessage={form.fieldErrors.comment}
          style={{ maxHeight: 200 }}
        />
        <div className={styles.addProductCont}>
          <div className={clsx(styles.oneLineCont, styles.bottom)}>
            <ProductSelector
              key={productInputKey}
              label="Товар"
              value={form.values.productId || null}
              onChange={async (id) => {
                form.setFieldValue("productId", id);
                if (id) {
                  const product = await triggerGetProduct(id).unwrap();
                  setSelectedProduct(product);
                } else setSelectedProduct(null);
              }}
              actions={[
                {
                  label: "Добавить новый товар",
                  icon: <PlusMinIcon />,
                  onClick: (currentInput) => {
                    handleProductAdd((product) => {
                      if (!product) return;
                      form.setFieldValue("productId", product.id);
                      setSelectedProduct(product);
                    }, currentInput as string);
                  },
                },
              ]}
            />
            {form.values.productId && (
              <IconButton
                size="big"
                tooltip="Карточка товара"
                icon={<BadgeIcon />}
                variant="outline"
                onClick={() => {
                  if (form.values.productId)
                    handleProductCard(form.values.productId);
                }}
              />
            )}
          </div>
          {isLoadingProduct && (
            <div className={styles.loaderCont}>
              <LoaderPage />
            </div>
          )}
          {form.values.productId && selectedProduct && (
            <>
              <DataGrid
                onReload={async () => {
                  const product = await triggerGetProduct(
                    selectedProduct.id
                  ).unwrap();
                  setSelectedProduct(product);
                }}
                items={[
                  {
                    title: "Короткое наим.",
                    description: selectedProduct.shortName || undefined,
                  },
                  {
                    title: "Артикул",
                    description: selectedProduct.article || undefined,
                  },
                  {
                    title: "Тип",
                    description: (
                      <ProductTypeTag type={selectedProduct.type} min />
                    ),
                  },
                  {
                    title: "Количество",
                    description: `${selectedProduct.stockBalance.quantity} ${selectedProduct.unitStorage.shortName}`,
                  },
                  {
                    title: "Услуги",
                    description:
                      selectedProduct.services.length > 0 ? (
                        <div className={styles.productServicesCont}>
                          {selectedProduct.services.map((service) => (
                            <ProductServiceTag service={service} min />
                          ))}
                        </div>
                      ) : undefined,
                  },
                  {
                    title: "Ресурс",
                    description: `${
                      selectedProduct.stockBalance.resourceQuantity
                    } ${
                      PRODUCT_UNIT_USAGE_LABELS_SHORT[selectedProduct.unitUsage]
                    } / ${selectedProduct.resourceValue} ${
                      PRODUCT_UNIT_USAGE_LABELS_SHORT[selectedProduct.unitUsage]
                    }`,
                  },
                  {
                    title: "Накоплено",
                    description: moneyFormat(selectedProduct.reserveValue),
                  },
                  {
                    title: "Цена списания",
                    description:
                      selectedProduct.currentWriteoffPrice > 0
                        ? `${moneyFormat(
                            selectedProduct.currentWriteoffPrice
                          )} - 
            ${moneyFormat(
              selectedProduct.currentWriteoffPrice *
                selectedProduct.currentConversionFactor
            )}
            за 1 ${PRODUCT_UNIT_USAGE_LABELS_SHORT[selectedProduct.unitUsage]}`
                        : undefined,
                  },
                ]}
              />

              <div
                className={clsx(styles.oneLineCont, styles.purchasePrice)}
                style={{ justifyContent: "flex-end" }}
              >
                <div style={{ width: "35%" }}>
                  <FundSelector
                    label="Фонд для списания"
                    value={form.values.fundId || null}
                    onChange={(val) => form.setFieldValue("fundId", val)}
                  />
                </div>
                <div style={{ width: "15%" }}>
                  <Input
                    label="Закупка"
                    name="price"
                    type="number"
                    min={0}
                    value={form.values.price ?? ""}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    rightIcon={<RubleIcon />}
                    error={Boolean(form.fieldErrors.price)}
                    errorMessage={form.fieldErrors.price}
                  />
                </div>
                <div style={{ width: "10%" }}>
                  <Input
                    label="Кол-во"
                    name="quantity"
                    type="number"
                    min={1}
                    value={form.values.quantity ?? ""}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={Boolean(form.fieldErrors.quantity)}
                    errorMessage={form.fieldErrors.quantity}
                  />
                </div>
                <div style={{ width: "15%" }}>
                  <Input
                    label="Списание"
                    name="currentWriteoffPrice"
                    type="number"
                    min="0"
                    value={form.values.currentWriteoffPrice ?? ""}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    rightIcon={<RubleIcon />}
                    error={Boolean(form.fieldErrors.currentWriteoffPrice)}
                    errorMessage={form.fieldErrors.currentWriteoffPrice}
                  />
                </div>
                <div style={{ width: "10%" }}>
                  <Select
                    label="%"
                    value={persentInflation}
                    options={Array.from({ length: 100 }, (_, i) => {
                      const percent = i + 1;
                      return { value: 1 + percent / 100, label: `${percent}%` };
                    })}
                    onChange={(val) => setPersentInflation(Number(val))}
                  />
                </div>
                <div style={{ width: "15%" }}>
                  <Input
                    label={`За 1 ${
                      PRODUCT_UNIT_USAGE_LABELS_SHORT[selectedProduct.unitUsage]
                    }`}
                    value={
                      form.values.currentWriteoffPrice &&
                      form.values.conversionFactor
                        ? String(
                            roundUp(
                              form.values.currentWriteoffPrice *
                                form.values.conversionFactor
                            )
                          )
                        : 0
                    }
                    readOnly
                    rightIcon={<RubleIcon />}
                  />
                </div>
              </div>
              <div className={styles.buttonsCont}>
                <Button variant="secondary" onClick={handleCancelAddProduct}>
                  Отменить
                </Button>
                <Button onClick={handleAddProduct}>Добавить в накладную</Button>
              </div>
            </>
          )}
        </div>
      </form>
      <div className={clsx("shadow-container", styles.purchaseInvoiceCont)}>
        <h4>Накладная от {formatDateToText(form.values.createdAt, "date")}</h4>
        {form.values.supplierName && (
          <p>
            Поставщик: {form.values.supplierName}
            <br />
            {form.values.supplierContactInfo}
          </p>
        )}
        <div className={styles.purchaseInvoiceProductsList}>
          {productsList.length > 0 && (
            <table className={styles.tablePrint}>
              <thead>
                <tr>
                  <th className={styles.right}>№</th>
                  <th>Наименование</th>
                  <th>Ед.</th>
                  <th className={styles.right}>Кол-во</th>
                  <th className={styles.right}>Цена</th>
                  <th className={styles.right}>Сумма</th>
                  <th className={styles.noBorder} style={{ width: 16 }}></th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((p, index) => {
                  totalPrice = totalPrice + p.price * p.quantity;
                  return (
                    <tr key={p.name}>
                      <td className={styles.right}>
                        <p className="text_small">{index + 1}</p>
                      </td>
                      <td>
                        <p className="text_small">{p.name}</p>
                      </td>
                      <td>
                        <p className="text_small">{p.unitStorageDisplay}</p>
                      </td>
                      <td className={styles.right}>
                        <p className="text_small">{p.quantity}</p>
                      </td>
                      <td className={clsx(styles.right, "nowrap-container")}>
                        <p className="text_small">{moneyFormat(p.price)}</p>
                      </td>
                      <td className={clsx(styles.right, "nowrap-container")}>
                        <p className="text_small">
                          {moneyFormat(p.price * p.quantity)}
                        </p>
                      </td>
                      <td className={styles.noBorder}>
                        <DeleteIcon
                          onClick={() => handleRemoveProduct(index)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className={clsx(styles.right, styles.total)} colSpan={6}>
                    <p className={clsx("text_big_bold", "nowrap-container")}>
                      ИТОГО {moneyFormat(totalPrice)}
                    </p>
                  </td>
                  <td
                    className={clsx(styles.total, styles.noBorder)}
                    style={{ width: 16 }}
                  />
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <div className={styles.purchaseInvoiceButtonsCont}>
          <Button
            onClick={handleSubmitInvoice}
            disabled={
              isLoadingCreatePurchaseInvoice ||
              productsList.length === 0 ||
              !(form.values.supplierId || form.values.supplierName)
            }
          >
            Оформить поступление
          </Button>
        </div>
      </div>
      <LoaderBlur isLoading={isLoadingCreatePurchaseInvoice} />
    </div>
  );
};
