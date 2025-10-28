import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./PiggyBankAdd.module.css";
import { useAddPiggyBankMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import { PiggyBank } from "../../../common/types";
import { RubleIcon } from "../../../assets/icons";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface PiggyBankAddProps {
  onSuccess: (piggyBank?: PiggyBank) => void;
  inputValue?: string;
}

export const PiggyBankAdd = ({ onSuccess, inputValue }: PiggyBankAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addPiggyBank, { isLoading }] = useAddPiggyBankMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование копилки"),
    plannedAmount: yup.number().required("Укажите планируемую сумму"),
  });

  const form = useForm(
    {
      name: inputValue ? inputValue : "",
      plannedAmount: 0,
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addPiggyBank({
        name: form.values.name!,
        plannedAmount: form.values.plannedAmount!,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Копилка ${form.values.name} успешно добавлена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении копилки`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.serviceAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Наименование копилки"
          placeholder="Укажите наименование копилки"
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <Input
          label="Планируемая сумма"
          name="plannedAmount"
          type="number"
          placeholder="Укажите планируемую сумму"
          value={form.values.plannedAmount!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.plannedAmount)}
          errorMessage={form.fieldErrors.plannedAmount}
          rightIcon={<RubleIcon />}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить копилку
          </Button>
        </div>
      </form>
      <LoaderBlur isLoading={isLoading} />
    </div>
  );
};
