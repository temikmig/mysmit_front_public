import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "../../../common/hooks";
import { useSnackbar } from "../../../common/hooks";
import * as yup from "yup";
import {
  useEditProductWriteOffPriceMutation,
  useGetProductQuery,
} from "../../../api";
import styles from "./ProductWriteOffEdit.module.css";
import { ApiError } from "../../../api/baseQuery";
import { PRODUCT_UNIT_USAGE_LABELS_SHORT } from "../../../common/types";
import { Textarea } from "../../ui/Textarea";
import LoaderPage from "../../ui/LoaderPage";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { RubleIcon } from "../../../assets/icons";
import { useEffect } from "react";
import { roundUp } from "../../../common/functions";

interface ProductWriteOffEditProps {
  productId: number;
  onSuccess?: () => void;
}

export const ProductWriteOffEdit = ({
  productId,
  onSuccess,
}: ProductWriteOffEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: product, isLoading: isLoadingProduct } =
    useGetProductQuery(productId);

  const [editWriteOffPrice, { isLoading }] =
    useEditProductWriteOffPriceMutation();

  const schema = yup.object({
    productId: yup.number().required(),
    writeoffPrice: yup.number().required("Укажите цену списания"),
    writeoffOnePrice: yup.number().required(),
    conversionFactor: yup.number().required(),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      productId: productId,
      writeoffPrice: roundUp(product?.currentWriteoffPrice || 0),
      writeoffOnePrice: roundUp(
        (product?.currentWriteoffPrice || 0) *
          (product?.currentConversionFactor || 1) || 0
      ),
      conversionFactor: product?.currentConversionFactor || 1,
      comment: "",
    },
    schema
  );

  const handleSubmit = async () => {
    try {
      await schema.validate(form.values, { abortEarly: false });

      await editWriteOffPrice({
        id: productId,
        data: {
          writeoffPrice: form.values.writeoffPrice!,
          conversionFactor: form.values.conversionFactor!,
          comment: form.values.comment!,
        },
      }).unwrap();

      showSnackbar({
        title: "Готово",
        message: "Цена списания успешно изменена",
        mode: "success",
        duration: 1500,
      });

      form.resetForm();

      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: "Не удалось изменить цену списания",
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (form.values.writeoffPrice! > 0 && form.values.writeoffOnePrice! > 0) {
      const factor = form.values.writeoffOnePrice! / form.values.writeoffPrice!;
      form.setFieldValue("conversionFactor", Number(factor));
    }
  }, [form.values.writeoffPrice, form.values.writeoffOnePrice]);

  if (isLoadingProduct) return <LoaderPage />;

  if (product)
    return (
      <div className={styles.writeOffCont}>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <Input
              label={`Цена списания за 1 ${product.unitStorage.shortName}`}
              value={form.values.writeoffPrice || undefined}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="writeoffPrice"
              type="number"
              min={0}
              error={!!form.fieldErrors.writeoffPrice}
              errorMessage={form.fieldErrors.writeoffPrice}
              rightIcon={<RubleIcon />}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Input
              label={`Цена списания за 1 ${
                PRODUCT_UNIT_USAGE_LABELS_SHORT[product.unitUsage]
              }`}
              value={form.values.writeoffOnePrice!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="writeoffOnePrice"
              type="number"
              min={0}
              error={!!form.fieldErrors.writeoffOnePrice}
              errorMessage={form.fieldErrors.writeoffOnePrice}
              rightIcon={<RubleIcon />}
            />
          </div>
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
            Изменить цену списания
          </Button>
        </div>
        <LoaderBlur isLoading={isLoading} />
      </div>
    );
};
