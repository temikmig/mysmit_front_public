import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ServiceEdit.module.css";
import { useEditServiceMutation, useGetServiceQuery } from "../../../api";
import { ColorPicker } from "../../ui/ColorPicker";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";
import { PercentIcon } from "../../../assets/icons";

interface ServiceAddProps {
  serviceId: number;
  onSuccess: () => void;
}

export const ServiceEdit = ({ serviceId, onSuccess }: ServiceAddProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: service, isLoading: isLoadingService } =
    useGetServiceQuery(serviceId);

  const [editService, { isLoading: isLoadingEdit }] = useEditServiceMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование услуги"),
    shortName: yup.string().notRequired(),
    salaryPercent: yup.number().nullable().required(),
    color: yup.string().required(),
  });

  const form = useForm(
    {
      name: service?.name || "",
      shortName: service?.shortName || "",
      salaryPercent: service?.salaryPercent || 0,
      color: service?.color || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    try {
      await editService({
        id: service.id,
        data: {
          name: form.values.name!,
          shortName: form.values.shortName || undefined,
          color: form.values.color!,
          salaryPercent: form.values.salaryPercent!,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Услуга ${form.values.name} успешно изменена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании услуги`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingService || isLoadingEdit;

  useEffect(() => {
    if (service) {
      form.setValues({
        name: service.name,
        shortName: service.shortName || undefined,
        salaryPercent: service.salaryPercent ? service.salaryPercent * 100 : 0,
        color: service.color,
      });
    }
  }, [service]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.serviceAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Наименование услуги"
          placeholder="Укажите наименование услуги"
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <Input
          label="Короткое наименование"
          name="shortName"
          placeholder="Например `Подкапотка`"
          value={form.values.shortName || undefined}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.shortName)}
          errorMessage={form.fieldErrors.shortName}
        />
        <Input
          label="Процент на зарплаты"
          name="salaryPercent"
          type="number"
          min={0}
          max={100}
          value={form.values.salaryPercent!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.salaryPercent)}
          errorMessage={form.fieldErrors.salaryPercent}
          rightIcon={<PercentIcon />}
        />
        <ColorPicker
          label="Цвет"
          onChange={(val) => form.setFieldValue("color", val)}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать услугу
          </Button>
        </div>
      </form>
    </div>
  );
};
