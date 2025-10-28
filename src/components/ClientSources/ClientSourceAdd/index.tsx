import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./ClientSourceAdd.module.css";
import { useAddClientSourceMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface ClientSourceAddProps {
  onSuccess: () => void;
  inputValue?: string;
}

export const ClientSourceAdd = ({
  onSuccess,
  inputValue,
}: ClientSourceAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addClientSource, { isLoading }] = useAddClientSourceMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование источника"),
  });

  const form = useForm(
    {
      name: inputValue ? inputValue : "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addClientSource({
        name: form.values.name!,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Источник ${form.values.name} успешно добавлен`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении источника`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

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
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить источник
          </Button>
        </div>
      </form>
      <LoaderBlur isLoading={isLoading} />
    </div>
  );
};
