import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ClientSourceEdit.module.css";
import {
  useEditClientSourceMutation,
  useGetClientSourceQuery,
} from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface ClientSourceEditProps {
  clientSourceId: string;
  onSuccess: () => void;
}

export const ClientSourceEdit = ({
  clientSourceId,
  onSuccess,
}: ClientSourceEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: clientSource, isLoading } =
    useGetClientSourceQuery(clientSourceId);

  const [editClientSource, { isLoading: isLoadingEdit }] =
    useEditClientSourceMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование источника"),
  });

  const form = useForm(
    {
      name: clientSource?.name || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientSource) return;

    try {
      await editClientSource({
        id: clientSourceId,
        data: {
          name: form.values.name!,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Информация об источнике успешно изменена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании источника`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (clientSource) {
      form.setValues({
        name: clientSource.name,
      });
    }
  }, [clientSource]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.clientSourceAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Наименование источника"
          placeholder="Укажите наименование источника"
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать источник
          </Button>
        </div>
      </form>
      <LoaderBlur isLoading={isLoadingEdit} />
    </div>
  );
};
