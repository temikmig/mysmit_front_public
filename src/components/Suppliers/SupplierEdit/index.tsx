import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./SupplierEdit.module.css";
import { useEditSupplierMutation, useGetSupplierQuery } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";

interface SupplierEditProps {
  supplierId: number;
  onSuccess: () => void;
}

export const SupplierEdit = ({ supplierId, onSuccess }: SupplierEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: supplier, isLoading: isLoadingSupplier } =
    useGetSupplierQuery(supplierId);

  const [editSupplier, { isLoading: isLoadingEdit }] =
    useEditSupplierMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование услуги"),
    contactInfo: yup.string().notRequired(),
  });

  const form = useForm(
    {
      name: supplier?.name || "",
      contactInfo: supplier?.contactInfo || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supplier) return;

    try {
      await editSupplier({
        id: supplier.id,
        data: {
          name: form.values.name!,
          contactInfo: form.values.contactInfo || undefined,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Информация о поставщике успешно изменена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании поставщика`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingSupplier || isLoadingEdit;

  useEffect(() => {
    if (supplier) {
      form.setValues({
        name: supplier.name,
        contactInfo: supplier.contactInfo,
      });
    }
  }, [supplier]);

  if (isLoading) return <LoaderPage />;

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
          name="contactInfo"
          placeholder="Телефон, адрес и т. д."
          value={form.values.contactInfo || undefined}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.contactInfo)}
          errorMessage={form.fieldErrors.contactInfo}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать поставщика
          </Button>
        </div>
      </form>
    </div>
  );
};
