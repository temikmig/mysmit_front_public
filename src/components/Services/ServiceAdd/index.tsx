import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ServiceAdd.module.css";
import { useAddServiceMutation } from "../../../api";
import { ColorPicker } from "../../ui/ColorPicker";
import { ApiError } from "../../../api/baseQuery";
import { PercentIcon } from "../../../assets/icons";

interface ServiceAddProps {
  onSuccess: () => void;
  inputValue?: string;
}

export const ServiceAdd = ({ onSuccess, inputValue }: ServiceAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addService, { isLoading }] = useAddServiceMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование услуги"),
    shortName: yup.string().notRequired(),
    color: yup.string().required(),
    salaryPercent: yup.number().required(),
  });

  const form = useForm(
    {
      name: inputValue ? inputValue : "",
      shortName: "",
      color: "#0f4c81",
      salaryPercent: 40,
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addService({
        name: form.values.name!,
        shortName: form.values.shortName || "",
        color: form.values.color!,
        salaryPercent: form.values.salaryPercent!,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Услуга ${form.values.name} успешно добавлена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении услуги`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

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
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить услугу
          </Button>
        </div>
      </form>
    </div>
  );
};
