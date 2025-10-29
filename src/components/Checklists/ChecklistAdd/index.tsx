/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ChecklistAdd.module.css";
import {
  useCreateChecklistMutation,
  useGetAllBusinessExpensesQuery,
  useGetBusinessPercentagesQuery,
  useGetProductsByServiceQuery,
} from "../../../api";
import { Fragment, useEffect, useState } from "react";
import {
  BadgeIcon,
  PlusMinIcon,
  RubleIcon,
  TimeCheckIcon,
} from "../../../assets/icons";
import {
  ACQUIRING_TYPES_LABELS,
  AcquiringType,
  AcquiringTypeEnum,
  ChecklistItem,
  LOYALTY_CARD_LEVEL_PERSENT,
  LoyaltyСardLevel,
  MoneySourceTypeEnum,
  PRODUCT_TYPES_LABELS,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductTypeEnum,
  ProductUnitUsageEnum,
  type Product,
  type ProductType,
} from "../../../common/types";
import { useHandlers } from "../../../common/hooks";
import { IconButton } from "../../ui/IconButton";
import clsx from "clsx";
import { ServiceSelector, SourceSelector } from "../../Selectors";
import { ClientCarSelector } from "../../Selectors/ClientCarSelector";
import { ClientSelector } from "../../Selectors/ClientSelector";
import { Checkbox } from "../../ui/Checkbox";
import LoaderPage from "../../ui/LoaderPage";
import { ApiError } from "../../../api/baseQuery";
import { ClickLink } from "../../ui/ClickLink";
import { Select } from "../../ui/Select";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { ChecklistAnalyticsTable } from "../ChecklistAnalyticsTable";
import { Textarea } from "../../ui/Textarea";
import { DatePicker } from "../../ui/DatePicker";
import { EmployeeSalarySelector } from "../EmployeeSalarySelector";
import { moneyFormat, roundUp } from "../../../common/functions";

interface ChecklistAddProps {
  onSuccess: () => void;
}

export const ChecklistAdd = ({ onSuccess }: ChecklistAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [createChecklist, { isLoading }] = useCreateChecklistMutation();
  const [items, setItems] = useState<Partial<ChecklistItem>[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<
    { employeeId: string; salary: number }[]
  >([]);

  const [showAcquiringType, setShowAcquiringType] = useState(false);

  const { data: businessExpenses } = useGetAllBusinessExpensesQuery();
  const { data: businessPercentages } = useGetBusinessPercentagesQuery();

  const RESERVE_PERSENT = businessPercentages
    ? businessPercentages.financialReserve
    : 0;

  const GROWTH_PERSENT = businessPercentages
    ? businessPercentages.businessGrowth
    : 0;

  const CARD_ACQUIRING_PERSENT = businessPercentages
    ? businessPercentages.cardAcquiring
    : 0;

  const QR_ACQUIRING_PERSENT = businessPercentages
    ? businessPercentages.qrAcquiring
    : 0;

  const schema = yup.object({
    serviceId: yup
      .number()
      .required("Выберите услугу")
      .moreThan(0, "Выберите услугу"),
    createdAt: yup.date().required("Укажите дату"),
    workTime: yup.number().required(),
    sourceId: yup.string().required("Укажите источник"),
    acquiringType: yup.string().required(),
    price: yup
      .number()
      .required("Укажите стоимость услуги")
      .moreThan(0, "Стоимость услуги должна быть положительной"),
    loyaltyWriteOff: yup.number().notRequired(),
    clientId: yup.string().required("Выберите клиента"),
    clientCarId: yup.string().required("Выберите авто"),
    comment: yup.string().notRequired(),

    businessExpenses: yup.number().min(0).required(),
    directExpenses: yup.number().min(0).required(),
    toolEquipment: yup.number().min(0).required(),
    salary: yup.number().min(0).required(),
    financialReserve: yup.number().min(0).required(),
    businessGrowth: yup.number().min(0).required(),
    acquiring: yup.number().min(0).required(),
    loyalty: yup.number().min(0).required(),
    acquisition: yup.number().min(0).required(),
    total: yup.number().min(0).required(),
    profit: yup.number().min(0).required(),

    clientLoyaltyLevel: yup.string().notRequired(),
    salaryPercent: yup.number().notRequired(),
  });

  const form = useForm(
    {
      serviceId: 0,
      createdAt: new Date(),
      workTime: 60,
      sourceId: "",
      acquiringType: AcquiringTypeEnum.NONE,
      price: 0,
      loyaltyWriteOff: 0,
      clientId: "",
      clientCarId: "",
      comment: "",

      businessExpenses: 0,
      directExpenses: 0,
      toolEquipment: 0,
      salary: 0,
      financialReserve: 0,
      businessGrowth: 0,
      acquiring: 0,
      loyalty: 0,
      acquisition: 0,
      total: 0,
      profit: 0,

      clientLoyaltyLevel: "", //
      salaryPercent: 0, //
    },
    schema
  );

  const {
    handleClientAdd,
    handleClientCarAdd,
    handleClientCard,
    handleServiceAdd,
    handleProductCard,
  } = useHandlers();

  const { data: serviceProducts, isLoading: isLoadingServiceProducts } =
    useGetProductsByServiceQuery(
      { serviceId: form.values.serviceId! },
      { skip: !form.values.serviceId }
    );

  const handleCheckboxChange = (checked: boolean, product: Product) => {
    setItems((prev) => {
      if (checked) {
        if (!prev.find((i) => i.productId === product.id)) {
          const newItems = [
            ...prev,
            { productId: product.id, quantityUsed: 1 },
          ];
          calculateTotals(newItems);
          return newItems;
        }
        return prev;
      } else {
        const newItems = prev.filter((i) => i.productId !== product.id);
        calculateTotals(newItems);
        return newItems;
      }
    });
  };

  const handleQuantityInputChange = (product: Product, value: number) => {
    setItems((prev) => {
      const newItems = prev.map((i) =>
        i.productId === product.id ? { ...i, quantityUsed: value } : i
      );
      calculateTotals(newItems);
      return newItems;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createChecklist({
        serviceId: form.values.serviceId!,
        createdAt: (form.values.createdAt || new Date()).toISOString(),
        comment: form.values.comment || undefined,
        workTime: form.values.workTime!,
        clientId: form.values.clientId!,
        clientCarId: form.values.clientCarId!,
        employees: selectedEmployees,
        price: form.values.price!,
        sourceId: form.values.sourceId!,
        acquiringType: form.values.acquiringType as AcquiringType,
        loyaltyWriteOff: form.values.loyaltyWriteOff || undefined,

        businessExpenses: form.values.businessExpenses || 0,
        directExpenses: form.values.directExpenses || 0,
        toolEquipment: form.values.toolEquipment || 0,
        salary: form.values.salary || 0,
        financialReserve: form.values.financialReserve || 0,
        businessGrowth: form.values.businessGrowth || 0,
        acquiring: form.values.acquiring || 0,
        loyalty: form.values.loyalty || 0,
        acquisition: form.values.acquisition || 0,
        total: form.values.total || 0,
        profit: form.values.profit || 0,

        items: items as ChecklistItem[],
      }).unwrap();

      form.resetForm();
      setItems([]);
      showSnackbar({
        title: "Сообщение",
        message: `Чек-лист успешно создан`,
        mode: "success",
      });
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при создании чек-листа`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const calculateTotals = (currentItems: Partial<ChecklistItem>[]) => {
    const materialTypes = [
      ProductTypeEnum.MATERIAL,

      ProductTypeEnum.CONSUMABLE,
    ] as ProductType[];
    const toolTypes = [
      ProductTypeEnum.TOOL,

      ProductTypeEnum.EQUIPMENT,
    ] as ProductType[];

    let directSum = 0;
    let toolSum = 0;

    currentItems.forEach((item) => {
      const product = serviceProducts?.products.find(
        (p) => p.id === item.productId
      );
      if (!product) return;

      const writeoffPrice = product.writeoffOnePrice ?? 0;
      const qty = item.quantityUsed ?? 0;

      const total =
        writeoffPrice *
        (toolTypes.includes(product.type) ? form.values.workTime! * qty : qty);

      if (materialTypes.includes(product.type)) directSum += total;
      if (toolTypes.includes(product.type)) toolSum += total;
    });

    directSum = roundUp(directSum);
    toolSum = roundUp(toolSum);

    form.setFieldValue("directExpenses", directSum);
    form.setFieldValue("toolEquipment", toolSum);
  };

  useEffect(() => {
    if (!form.values.serviceId) {
      setItems([]);
    }
  }, [form.values.serviceId]);

  useEffect(() => {
    if (!serviceProducts) return;

    let reserveVal = 0;
    let growthVal = 0;
    let salaryVal = 0;
    let businessExpenseCost = 0;
    const attractionVal = 0;

    calculateTotals(items);

    if (businessExpenses) {
      businessExpenseCost = roundUp(
        businessExpenses.totalAmountPerMinute * form.values.workTime! || 0
      );
    }

    if (form.values.price) {
      reserveVal = roundUp(RESERVE_PERSENT * form.values.price);
      growthVal = roundUp(GROWTH_PERSENT * form.values.price);
      salaryVal = roundUp(form.values.price * serviceProducts.salaryPercent);
    }

    form.setFieldValue("businessExpenses", businessExpenseCost);
    form.setFieldValue("salary", salaryVal);
    form.setFieldValue("financialReserve", reserveVal);
    form.setFieldValue("businessGrowth", growthVal);
    form.setFieldValue("attraction", attractionVal);
  }, [
    items,
    serviceProducts,
    form.values.workTime,
    form.values.price,
    form.values.clientId,
  ]);

  useEffect(() => {
    let loyaltyVal = 0;

    if (form.values.clientLoyaltyLevel && form.values.price) {
      loyaltyVal = roundUp(
        form.values.price *
          LOYALTY_CARD_LEVEL_PERSENT[
            form.values.clientLoyaltyLevel as LoyaltyСardLevel
          ]
      );
    }

    if (form.values.loyaltyWriteOff && form.values.loyaltyWriteOff > 0) {
      form.setFieldValue("loyalty", 0);
    } else {
      form.setFieldValue("loyalty", loyaltyVal);
    }
  }, [form.values.price, form.values.loyaltyWriteOff]);

  useEffect(() => {
    let acquiringVal = 0;

    if (form.values.price && form.values.acquiringType) {
      if (form.values.acquiringType === AcquiringTypeEnum.CARD)
        acquiringVal = roundUp(CARD_ACQUIRING_PERSENT * form.values.price);
      if (form.values.acquiringType === AcquiringTypeEnum.QR)
        acquiringVal = roundUp(QR_ACQUIRING_PERSENT * form.values.price);
      if (form.values.acquiringType === AcquiringTypeEnum.NONE)
        acquiringVal = 0;
    }

    form.setFieldValue("acquiring", acquiringVal);
  }, [form.values.price, form.values.acquiringType]);

  useEffect(() => {
    if (form.values.clientId === "") {
      form.setFieldValue("clientLoyaltyLevel", "");
      form.setFieldValue("loyalty", "");
    }
  }, [form.values.clientId]);

  return (
    <div className={styles.employeeAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <div className={styles.oneLineCont}>
          <div className={styles.formCont}>
            <div className={styles.oneLineCont}>
              <div style={{ width: "30%" }}>
                <DatePicker
                  value={form.values.createdAt}
                  onChange={(date) => form.setFieldValue("createdAt", date)}
                  label="Дата"
                  error={Boolean(form.fieldErrors.createdAt)}
                  errorMessage={form.fieldErrors.createdAt}
                />
              </div>
              <div style={{ width: "70%" }}>
                <ServiceSelector
                  label="Услуга"
                  mode="single"
                  value={form.values.serviceId!}
                  onChange={(val) => {
                    form.setFieldValue("serviceId", Number(val));
                  }}
                  actions={[
                    {
                      label: "Добавить услугу",
                      icon: <PlusMinIcon />,
                      onClick: (currentInput) =>
                        handleServiceAdd(undefined, currentInput as string),
                    },
                  ]}
                  error={Boolean(form.fieldErrors.serviceId)}
                  errorMessage={form.fieldErrors.serviceId}
                />
              </div>
            </div>
            <div className={clsx(styles.oneLineCont, styles.bottom)}>
              <ClientSelector
                label="Клиент"
                value={form.values.clientId!}
                onChange={(val, client) => {
                  form.setFieldValue("clientId", String(val));
                  if (client) {
                    form.setFieldValue(
                      "clientLoyaltyLevel",
                      client.loyaltyСardLevel
                    );
                  }
                }}
                actions={[
                  {
                    label: "Добавить клиента",
                    icon: <PlusMinIcon />,
                    onClick: (currentInput) =>
                      handleClientAdd(undefined, currentInput as string),
                  },
                ]}
                error={Boolean(form.fieldErrors.clientId)}
                errorMessage={form.fieldErrors.clientId}
              />
              {form.values.clientId && (
                <>
                  <IconButton
                    size="big"
                    variant="outline"
                    tooltip="Карточка клиента"
                    icon={<BadgeIcon />}
                    onClick={() => {
                      if (form.values.clientId)
                        handleClientCard(form.values.clientId);
                    }}
                  />

                  <ClientCarSelector
                    label="Автомобиль клиента"
                    value={form.values.clientCarId!}
                    onChange={(val) =>
                      form.setFieldValue("clientCarId", String(val))
                    }
                    actions={[
                      {
                        label: "Добавить автомобиль",
                        icon: <PlusMinIcon />,
                        onClick: (currentInput) =>
                          handleClientCarAdd(
                            form.values.clientId!,
                            undefined,
                            currentInput as string
                          ),
                      },
                    ]}
                    clientId={form.values.clientId}
                    error={Boolean(form.fieldErrors.clientCarId)}
                    errorMessage={form.fieldErrors.clientCarId}
                  />
                </>
              )}
            </div>
            <div className={styles.oneLineCont}>
              <div style={{ width: "40%" }}>
                <EmployeeSalarySelector
                  label="Сотрудники"
                  value={selectedEmployees}
                  onChange={(arr) => setSelectedEmployees(arr)}
                  salary={form.values.salary!}
                  error={selectedEmployees.length === 0}
                  errorMessage={
                    selectedEmployees.length === 0
                      ? `Выберите сотрудника`
                      : undefined
                  }
                />
              </div>
              <div style={{ width: "20%" }}>
                <Input
                  label="Время"
                  name="workTime"
                  type="number"
                  value={form.values.workTime || 0}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={Boolean(form.fieldErrors.workTime)}
                  errorMessage={form.fieldErrors.workTime}
                  rightIcon={<TimeCheckIcon />}
                />
              </div>
              <div className={styles.oneColumnCont} style={{ width: "20%" }}>
                <Input
                  label="Стоимость услуги"
                  name="price"
                  type="number"
                  value={form.values.price || 0}
                  min={0}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={Boolean(form.fieldErrors.price)}
                  errorMessage={form.fieldErrors.price}
                  rightIcon={<RubleIcon />}
                />
                {form.values.clientId && form.values.clientLoyaltyLevel && (
                  <Input
                    label="Списать с карты"
                    name="loyaltyWriteOff"
                    type="number"
                    value={form.values.loyaltyWriteOff || 0}
                    min={0}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={Boolean(form.fieldErrors.loyaltyWriteOff)}
                    errorMessage={form.fieldErrors.loyaltyWriteOff}
                    rightIcon={<RubleIcon />}
                  />
                )}
              </div>
              <div className={styles.oneColumnCont}>
                <SourceSelector
                  label="Оплата на"
                  value={form.values.sourceId!}
                  onChange={(val, source) => {
                    form.setFieldValue("sourceId", val);
                    if (
                      source &&
                      source.type === MoneySourceTypeEnum.BANK_ACCOUNT
                    ) {
                      setShowAcquiringType(true);
                    } else {
                      setShowAcquiringType(false);
                      form.setFieldValue(
                        "acquiringType",
                        AcquiringTypeEnum.NONE
                      );
                    }
                  }}
                  error={Boolean(form.fieldErrors.sourceId)}
                  errorMessage={form.fieldErrors.sourceId}
                />
                {showAcquiringType && (
                  <Select
                    label="Тип эквайринга"
                    value={form.values.acquiringType!}
                    options={Object.entries(ACQUIRING_TYPES_LABELS).map(
                      ([key, label]) => ({
                        value: key,
                        label,
                      })
                    )}
                    onChange={(val) =>
                      form.setFieldValue("acquiringType", val as AcquiringType)
                    }
                    error={Boolean(form.fieldErrors.acquiringType)}
                    errorMessage={form.fieldErrors.acquiringType}
                  />
                )}
              </div>
            </div>
            <Textarea
              label="Комментарий"
              name="comment"
              value={form.values.comment || ""}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.comment)}
              errorMessage={form.fieldErrors.comment}
            />
            {form.values.serviceId ? (
              <>
                {isLoadingServiceProducts && <LoaderPage />}
                {serviceProducts && (
                  <div
                    className={clsx("shadow-container", styles.productsCont)}
                  >
                    <table className={styles.checklistTable}>
                      <tbody>
                        {Object.entries(
                          serviceProducts.products.reduce<
                            Record<ProductType, Product[]>
                          >((acc, product) => {
                            if (!acc[product.type]) acc[product.type] = [];
                            acc[product.type].push(product);
                            return acc;
                          }, {} as Record<ProductType, Product[]>)
                        ).map(([type, products], index) => {
                          const typeKey = type as ProductType;
                          return (
                            <Fragment key={index}>
                              <tr>
                                <td
                                  colSpan={4}
                                  className={styles.productGroupName}
                                >
                                  <p className="text_medium_bold">
                                    {PRODUCT_TYPES_LABELS[typeKey]}
                                  </p>
                                </td>
                              </tr>
                              {products.map((product) => {
                                const item = items.find(
                                  (i) => i.productId === product.id
                                );
                                const checked = Boolean(item);
                                const quantity = item?.quantityUsed || 1;
                                const isMinutes =
                                  product.unitUsage ===
                                  ProductUnitUsageEnum.MINUTES;

                                return (
                                  <tr
                                    key={product.id}
                                    className={styles.productItem}
                                  >
                                    <td>
                                      <p className="text_medium">
                                        <ClickLink
                                          onClick={() => {
                                            handleProductCard(product.id);
                                          }}
                                        >
                                          {product.name}
                                        </ClickLink>
                                      </p>
                                    </td>
                                    <td className={styles.productWriteOffPrice}>
                                      {`${moneyFormat(
                                        product.writeoffOnePrice
                                      )}`}
                                      <br />
                                      {`за 1 ${
                                        PRODUCT_UNIT_USAGE_LABELS_SHORT[
                                          product.unitUsage
                                        ]
                                      }`}
                                    </td>
                                    <td className={styles.productCheck}>
                                      <Checkbox
                                        sizeBox="big"
                                        checked={checked}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e.target.checked,
                                            product
                                          )
                                        }
                                      />
                                    </td>
                                    <td className={styles.productQty}>
                                      <div className={styles.oneLineCenterCont}>
                                        {checked && (
                                          <>
                                            <Input
                                              name={product.name}
                                              type="number"
                                              min={0}
                                              value={quantity}
                                              onChange={(e) =>
                                                handleQuantityInputChange(
                                                  product,
                                                  Number(e.target.value)
                                                )
                                              }
                                            />
                                            <span>
                                              {isMinutes
                                                ? product.unitStorage.shortName
                                                : PRODUCT_UNIT_USAGE_LABELS_SHORT[
                                                    product.unitUsage
                                                  ] || ""}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
          {Boolean(form.values.serviceId) && (
            <ChecklistAnalyticsTable
              businessExpenses={form.values.businessExpenses!}
              directExpenses={form.values.directExpenses!}
              toolEquipment={form.values.toolEquipment!}
              salary={form.values.salary!}
              financialReserve={form.values.financialReserve!}
              businessGrowth={form.values.businessGrowth!}
              acquiring={form.values.acquiring!}
              loyalty={form.values.loyalty!}
              acquisition={form.values.acquisition!}
              price={form.values.price!}
              formSetFieldValue={form.setFieldValue}
              loyaltyDisabled={form.values.clientId === ""}
              salaryDisabled={selectedEmployees.length === 0}
            />
          )}
        </div>
        <div className={styles.buttonsCont}>
          <Button
            type="submit"
            disabled={!form.isValid || form.values.profit! < 0}
          >
            Создать чек-лист
          </Button>
        </div>
      </form>
      <LoaderBlur isLoading={isLoading} />
    </div>
  );
};
