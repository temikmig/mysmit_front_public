import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "../../../common/hooks";
import { useSnackbar } from "../../../common/hooks";
import * as yup from "yup";
import { useCreateWriteOffMutation, useGetProductQuery } from "../../../api";
import styles from "./ProductWriteOff.module.css";
import { ApiError } from "../../../api/baseQuery";
import { Select } from "../../ui/Select";
import { useState } from "react";
import {
  PRODUCT_UNIT_USAGE_LABELS_SHORT,
  WriteOffModeType,
  WriteOffModeTypeEnum,
} from "../../../common/types";
import { Textarea } from "../../ui/Textarea";
import LoaderPage from "../../ui/LoaderPage";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { clsx } from "clsx";

interface ProductWriteOffProps {
  productId: number;
  onSuccess?: () => void;
}

export const ProductWriteOff = ({
  productId,
  onSuccess,
}: ProductWriteOffProps) => {
  const { showSnackbar } = useSnackbar();

  const [writeOffMode, setWriteOffMode] =
    useState<WriteOffModeType>("QUANTITY");

  const handleChangeWriteOffMode = (mode: WriteOffModeType) => {
    setWriteOffMode(mode);
  };

  const { data: product, isLoading: isLoadingProduct } =
    useGetProductQuery(productId);

  const [createWriteOff, { isLoading }] = useCreateWriteOffMutation();

  const schema = yup.object({
    productId: yup.number().required(),
    quantity: yup
      .number()
      .required(
        writeOffMode === WriteOffModeTypeEnum.QUANTITY
          ? "Укажите количество"
          : undefined
      )
      .nullable(),
    resourceQuantity: yup
      .number()
      .required(
        writeOffMode === WriteOffModeTypeEnum.RESOURCE_QUANTITY
          ? "Укажите ресурсное количество"
          : undefined
      )
      .nullable(),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      productId: productId,
      quantity: 0,
      resourceQuantity: 0,
      comment: "",
    },
    schema
  );

  const handleSubmit = async () => {
    try {
      await schema.validate(form.values, { abortEarly: false });

      await createWriteOff({
        productId: form.values.productId!,
        ...(form.values.quantity ? { quantity: form.values.quantity } : {}),
        ...(form.values.resourceQuantity
          ? { resourceQuantity: form.values.resourceQuantity }
          : {}),
        ...(form.values.comment ? { comment: form.values.comment } : {}),
      }).unwrap();

      showSnackbar({
        title: "Готово",
        message: "Товар успешно списан",
        mode: "success",
        duration: 1500,
      });

      form.resetForm();

      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: "Не удалось списать товар",
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  if (isLoadingProduct) return <LoaderPage />;

  if (product)
    return (
      <div className={styles.writeOffCont}>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <Select
              label="Списание по"
              value={writeOffMode}
              options={[
                { label: "Количеству", value: WriteOffModeTypeEnum.QUANTITY },
                {
                  label: "Ресурсу",
                  value: WriteOffModeTypeEnum.RESOURCE_QUANTITY,
                },
              ]}
              onChange={(val) => {
                handleChangeWriteOffMode(val as WriteOffModeType);
              }}
            />
          </div>
          {writeOffMode === WriteOffModeTypeEnum.QUANTITY && (
            <>
              <Input
                label="Количество"
                value={form.values.quantity || undefined}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="quantity"
                type="number"
                error={!!form.fieldErrors.quantity}
                errorMessage={form.fieldErrors.quantity}
              />
              <p className={clsx("text_medium", styles.unit)}>
                {product.unitStorage.shortName}
              </p>
            </>
          )}
          {writeOffMode === WriteOffModeTypeEnum.RESOURCE_QUANTITY && (
            <>
              <Input
                label="Ресурс"
                value={form.values.resourceQuantity || undefined}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="resourceQuantity"
                type="number"
                error={!!form.fieldErrors.resourceQuantity}
                errorMessage={form.fieldErrors.resourceQuantity}
              />
              <p className={clsx("text_medium", styles.unit)}>
                {PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]}
              </p>
            </>
          )}
        </div>
        <Textarea
          label="Комментарий"
          placeholder="Укажите комментарий"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="comment"
          error={!!form.fieldErrors.comment}
          errorMessage={form.fieldErrors.comment}
          style={{ maxHeight: 150 }}
        />
        <div className={styles.buttonsCont}>
          <Button onClick={handleSubmit} disabled={!form.isValid || isLoading}>
            {`Списать ${
              writeOffMode === WriteOffModeTypeEnum.QUANTITY
                ? "количество"
                : "ресурс"
            }`}
          </Button>
        </div>
        <LoaderBlur isLoading={isLoading} />
      </div>
    );
};
