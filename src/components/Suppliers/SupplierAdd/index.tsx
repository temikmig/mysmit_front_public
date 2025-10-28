import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./SupplierAdd.module.css";
import { useAddSupplierMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { Supplier } from "../../../common/types";

interface SupplierAddProps {
  onSuccess: (supplier?: Supplier) => void;
  inputValue?: string;
}

export const SupplierAdd = ({ onSuccess, inputValue }: SupplierAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addSupplier, { isLoading }] = useAddSupplierMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование услуги"),
    contactInfo: yup.string().notRequired(),
  });

  const form = useForm(
    {
      name: inputValue ? inputValue : "",
      contactInfo: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const record = await addSupplier({
        name: form.values.name!,
        contactInfo: form.values.contactInfo || "",
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Поставщик ${form.values.name} успешно добавлен`,
        mode: "success",
      });

      form.resetForm();
      onSuccess(record);
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении поставщика`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.serviceAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Наименование поставщика"
          placeholder="Укажите наименование поставщика"
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <Input
          label="Контактная информация"
          name="shortName"
          placeholder="Телефон, адрес и т. д."
          value={form.values.contactInfo || undefined}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.contactInfo)}
          errorMessage={form.fieldErrors.contactInfo}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить поставщика
          </Button>
        </div>
      </form>
    </div>
  );
};
