import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm, useHandlers } from "../../../common/hooks";
import { useSnackbar } from "../../../common/hooks";
import * as yup from "yup";
import { useEditProductMutation, useGetProductQuery } from "../../../api";
import styles from "./ProductEdit.module.css";
import { ApiError } from "../../../api/baseQuery";
import { Select } from "../../ui/Select";
import { PRODUCT_TYPES_LABELS, ProductType } from "../../../common/types";
import LoaderPage from "../../ui/LoaderPage";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { ServiceSelector } from "../../Selectors";
import { Tooltip } from "../../ui/Tooltip";
import { InfoIcon, PlusMinIcon } from "../../../assets/icons";
import { useEffect, useState } from "react";

interface ProductEditProps {
  productId: number;
  onSuccess?: () => void;
}

export const ProductEdit = ({ productId, onSuccess }: ProductEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { handleServiceAdd } = useHandlers();

  const { data: product, isLoading: isLoadingProduct } =
    useGetProductQuery(productId);

  const [selectedServices, setSelectedServices] = useState<number[]>();
  const [selectedServicesLabelsMap, setSelectedServicesLabelsMap] = useState<
    Record<number, string>
  >({});

  const [editProduct, { isLoading }] = useEditProductMutation();

  const schema = yup.object({
    productId: yup.number().notRequired(),
    name: yup.string().required("Укажите наименование товара"),
    shortName: yup.string().notRequired(),
    article: yup.string().notRequired(),
    type: yup.string().required("Выберите тип"),
  });

  const form = useForm(
    {
      productId: productId,
      name: product?.name || "",
      shortName: product?.shortName || "",
      article: product?.article || "",
      type: product?.type || "",
    },
    schema
  );

  const handleSubmit = async () => {
    try {
      await schema.validate(form.values, { abortEarly: false });

      await editProduct({
        id: productId,
        data: {
          name: form.values.name!,
          shortName: form.values.shortName || "",
          article: form.values.article || "",
          type: form.values.type as ProductType,
          serviceIds: selectedServices || [],
        },
      }).unwrap();

      showSnackbar({
        title: "Готово",
        message: "Товар успешно отредактирован",
        mode: "success",
        duration: 1500,
      });

      form.resetForm();

      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: "Не удалось отредактировать товар",
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (product) {
      form.setValues({
        name: product.name,
        type: product.type,
        shortName: product.shortName,
        article: product.article,
      });

      const servicesIds = product.services.map((s) => s.id);
      setSelectedServices(servicesIds);

      const map: Record<number, string> = {};
      product.services.forEach((s) => {
        map[s.id] = s.name || "";
      });
      setSelectedServicesLabelsMap(map);
    }
  }, [product]);

  if (isLoadingProduct) return <LoaderPage />;

  if (product)
    return (
      <div className={styles.productEditCont}>
        <Input
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
          <div style={{ width: "40%" }}>
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
          <div style={{ width: "30%" }}>
            <Input
              label="Короткое наименование"
              placeholder="Например, `Апельсинка`"
              name="shortName"
              value={form.values.shortName || undefined}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
          <div style={{ width: "30%" }}>
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
          valueLabelsMap={selectedServicesLabelsMap}
        />
        <div className={styles.buttonsCont}>
          <Button onClick={handleSubmit} disabled={!form.isValid || isLoading}>
            Редактировать товар
          </Button>
        </div>
        <LoaderBlur isLoading={isLoading} />
      </div>
    );
};
