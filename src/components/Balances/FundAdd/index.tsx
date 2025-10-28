import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./FundAdd.module.css";
import { useAddFundMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";

interface FundAddProps {
  fundParentId?: string;
  onSuccess: () => void;
}

export const FundAdd = ({ fundParentId, onSuccess }: FundAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addFund, { isLoading }] = useAddFundMutation();

  const schema = yup.object({
    name: yup
      .string()
      .required(`Укажите наименование ${fundParentId ? `под` : ``}фонда`),
  });

  const form = useForm(
    {
      name: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addFund({
        name: form.values.name!,
        parentId: fundParentId || undefined,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `${fundParentId ? `Подфонд` : `Фонд`} ${
          form.values.name
        } успешно добавлен`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении ${
          fundParentId ? `под` : ``
        }фонда`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.clientAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label={`Наименование ${fundParentId ? `под` : ``}фонда`}
          placeholder={`Укажите наименование ${fundParentId ? `под` : ``}фонда`}
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            {`Добавить ${fundParentId ? `под` : ``}фонд`}
          </Button>
        </div>
      </form>
    </div>
  );
};
