import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm, useHandlers } from "../../../common/hooks";
import { useSnackbar } from "../../../common/hooks";
import * as yup from "yup";
import { useAddProductMutation, useGetUnitsQuery } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { Select } from "../../ui/Select";
import {
  Product,
  PRODUCT_TYPES_LABELS,
  PRODUCT_UNIT_USAGE_LABELS,
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  ProductType,
  ProductTypeEnum,
  ProductUnitUsage,
  ProductUnitUsageEnum,
  Unit,
} from "../../../common/types";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { ServiceSelector } from "../../Selectors";
import { Tooltip } from "../../ui/Tooltip";
import { InfoIcon, PlusMinIcon } from "../../../assets/icons";
import { useEffect, useState } from "react";

import styles from "./ProductAdd.module.css";
import { Textarea } from "../../ui/Textarea";
import clsx from "clsx";
import { thousandFormat } from "../../../common/functions";

interface ProductAddProps {
  onSuccess?: (product?: Product) => void;
  inputValue?: string;
}

export const ProductAdd = ({ onSuccess, inputValue }: ProductAddProps) => {
  const { showSnackbar } = useSnackbar();

  const { handleServiceAdd } = useHandlers();

  const [selectedServices, setSelectedServices] = useState<number[]>();

  const [addProduct, { isLoading }] = useAddProductMutation();
  const { data: units } = useGetUnitsQuery();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование товара"),
    shortName: yup.string().notRequired(),
    article: yup.string().notRequired(),
    type: yup.string().required("Выберите тип"),
    unitStorageId: yup.number().required(),
    resourceValue: yup.number().required(),
    unitUsage: yup.string().required(),
    services: yup.array().notRequired(),

    resourceQuantityDisplay: yup
      .number()
      .required("Укажите количество")
      .moreThan(0, "Количество должно быть положительным"),
    unitUsageDisplay: yup.string().required(),
  });

  const form = useForm(
    {
      name: inputValue ? inputValue : "",
      shortName: "",
      article: "",
      type: "",
      unitStorageId: 1,
      resourceValue: 0,
      unitUsage: ProductUnitUsageEnum.PIECES,
      services: selectedServices || [],

      resourceQuantityDisplay: 0,
      unitUsageDisplay: ProductUnitUsageEnum.PIECES,
    },
    schema
  );

  const handleSubmit = async () => {
    try {
      await schema.validate(form.values, { abortEarly: false });

      const product = await addProduct({
        name: form.values.name!,
        shortName: form.values.shortName || "",
        article: form.values.article || "",
        type: form.values.type as ProductType,
        unitStorageId: form.values.unitStorageId!,
        resourceValue: form.values.resourceValue!,
        unitUsage: form.values.unitUsage as ProductUnitUsage,
        services: selectedServices || [],
      }).unwrap();

      showSnackbar({
        title: "Готово",
        message: "Товар успешно добавлен",
        mode: "success",
        duration: 1500,
      });

      form.resetForm();

      onSuccess?.(await product);
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: "Не удалось добавить товар",
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const RESTRICTED_TYPES: ProductType[] = [
    ProductTypeEnum.TOOL,
    ProductTypeEnum.EQUIPMENT,
    ProductTypeEnum.BUSINESS_COST_MATERIAL,
    ProductTypeEnum.BUSINESS_COST_STORAGE,
    ProductTypeEnum.BUSINESS_COST_EQUIPMENT,
  ];

  const getAvailableUnitUsages = (type?: ProductType) => {
    if (type && RESTRICTED_TYPES.includes(type)) {
      return {
        [ProductUnitUsageEnum.MINUTES]:
          PRODUCT_UNIT_USAGE_LABELS[ProductUnitUsageEnum.MINUTES],
        [ProductUnitUsageEnum.HOURS]:
          PRODUCT_UNIT_USAGE_LABELS[ProductUnitUsageEnum.HOURS],
        [ProductUnitUsageEnum.DAYS]:
          PRODUCT_UNIT_USAGE_LABELS[ProductUnitUsageEnum.DAYS],
        [ProductUnitUsageEnum.MONTHS]:
          PRODUCT_UNIT_USAGE_LABELS[ProductUnitUsageEnum.MONTHS],
        [ProductUnitUsageEnum.YEARS]:
          PRODUCT_UNIT_USAGE_LABELS[ProductUnitUsageEnum.YEARS],
      };
    }
    return PRODUCT_UNIT_USAGE_LABELS;
  };

  const timeUnits = ["HOURS", "DAYS", "MONTHS", "YEARS"] as const;

  const unitOptions = getAvailableUnitUsages(form.values.type as ProductType);

  useEffect(() => {
    let coeff = 1;

    if (
      timeUnits.includes(
        form.values.unitUsageDisplay as "HOURS" | "DAYS" | "MONTHS" | "YEARS"
      )
    ) {
      switch (form.values.unitUsageDisplay) {
        case "HOURS":
          coeff = 60;
          break;
        case "DAYS":
          coeff = 60 * 8;
          break;
        case "MONTHS":
          coeff = 60 * 8 * 30;
          break;
        case "YEARS":
          coeff = 60 * 8 * 30 * 12;
          break;
      }
      form.setFieldValue("unitUsage", "MINUTES");
    } else form.setFieldValue("unitUsage", form.values.unitUsageDisplay);

    if (form.values.resourceQuantityDisplay) {
      const value = form.values.resourceQuantityDisplay * coeff;
      form.setFieldValue("resourceValue", value);
    }
  }, [form.values.unitUsageDisplay, form.values.resourceQuantityDisplay]);

  useEffect(() => {
    const { type } = form.values;

    if (type && RESTRICTED_TYPES.includes(type as ProductType)) {
      form.setFieldValue("unitUsageDisplay", ProductUnitUsageEnum.MINUTES);
    }
  }, [form.values.type]);

  return (
    <div className={styles.productAddCont}>
      <Textarea
        label="Наименование товара"
        placeholder="Укажите полное наименование товара"
        name="name"
        value={form.values.name!}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={Boolean(form.fieldErrors.name)}
        errorMessage={form.fieldErrors.name}
      />
      <div className={styles.oneLineCont}>
        <div style={{ width: "50%" }}>
          <Input
            label="Короткое наименование"
            placeholder="Например, `Апельсинка`"
            name="shortName"
            value={form.values.shortName || undefined}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
        <div style={{ width: "50%" }}>
          <Input
            label="Артикул"
            placeholder="Укажите артикул товара"
            name="article"
            value={form.values.article || undefined}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
      </div>
      <div className={clsx(styles.oneLineCont, styles.bottom)}>
        <div style={{ width: "58%" }}>
          <Select
            label="Тип"
            value={form.values.type!}
            options={Object.entries(PRODUCT_TYPES_LABELS).map(
              ([key, label]) => ({
                value: key,
                label,
              })
            )}
            onChange={(val) => form.setFieldValue("type", val as ProductType)}
            error={Boolean(form.fieldErrors.type)}
            errorMessage={form.fieldErrors.type}
          />
        </div>
        <div style={{ width: "14%" }}>
          <Select<Unit>
            label="Хранение в"
            value={form.values.unitStorageId!}
            onChange={(v, obj) => {
              form.setFieldValue("unitStorageId", Number(v));
              if (!Array.isArray(obj)) {
                form.setFieldValue("unitStorageDisplay", obj?.display);
              }
            }}
            options={
              units?.map((u) => ({
                label: u.name,
                display: u.shortName,
                value: u.id,
              })) || []
            }
            fullWidth={false}
          />
        </div>
        <div style={{ width: "14%" }}>
          <Input
            label="Базовый ресурс"
            name="resourceQuantityDisplay"
            type="number"
            min="1"
            value={form.values.resourceQuantityDisplay!}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={Boolean(form.fieldErrors.resourceQuantityDisplay)}
            errorMessage={form.fieldErrors.resourceQuantityDisplay}
          />
        </div>
        <div style={{ width: "14%" }}>
          <Select
            value={form.values.unitUsageDisplay!}
            options={Object.entries(unitOptions).map(([key, label]) => ({
              value: key,
              label: label,
              display: PRODUCT_UNIT_USAGE_LABELS_SHORT[key as ProductUnitUsage],
            }))}
            onChange={(val) => {
              form.setFieldValue("unitUsageDisplay", val as ProductUnitUsage);
            }}
            error={Boolean(form.fieldErrors.resourceQuantityDisplay)}
            errorMessage={form.fieldErrors.resourceQuantityDisplay}
            fullWidth={false}
          />
        </div>
      </div>
      {timeUnits.includes(
        form.values.unitUsageDisplay as "YEARS" | "MONTHS" | "DAYS" | "HOURS"
      ) && (
        <div className={styles.unitsMinutes}>
          {`${thousandFormat(form.values.resourceQuantityDisplay!)} ${
            PRODUCT_UNIT_USAGE_LABELS_SHORT[
              form.values.unitUsageDisplay as ProductUnitUsage
            ]
          } = ${thousandFormat(form.values.resourceValue!)} ${
            PRODUCT_UNIT_USAGE_LABELS_SHORT[
              form.values.unitUsage as ProductUnitUsage
            ]
          }`}
        </div>
      )}
      <ServiceSelector
        label={
          <>
            Услуги
            <Tooltip
              text="Вы можете выбрать несколько услуг"
              placement="right center"
              offsetX={4}
              withArrow
            >
              <InfoIcon width="16px" height="16px" />
            </Tooltip>
          </>
        }
        mode="multiple"
        value={selectedServices as number[]}
        onChange={(val) => setSelectedServices(val as number[])}
        actions={[
          {
            label: "Добавить услугу",
            icon: <PlusMinIcon />,
            onClick: (currentInput) => {
              handleServiceAdd(undefined, currentInput as string);
            },
          },
        ]}
        keepOpenOnSelect
      />
      <div className={styles.buttonsCont}>
        <Button onClick={handleSubmit} disabled={!form.isValid || isLoading}>
          Добавить товар
        </Button>
      </div>
      <LoaderBlur isLoading={isLoading} />
    </div>
  );
};
