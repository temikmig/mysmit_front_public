import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./BusinessExpenseAdd.module.css";
import { useAddBusinessExpenseMutation } from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import {
  EXPENSE_PERIOD_LABELS,
  ExpensePeriod,
  ExpensePeriodEnum,
} from "../../../common/types";
import { RubleIcon } from "../../../assets/icons";
import { Select } from "../../ui/Select";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { Textarea } from "../../ui/Textarea";

interface BusinessExpenseAddProps {
  onSuccess: () => void;
}

export const BusinessExpenseAdd = ({ onSuccess }: BusinessExpenseAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addBusinessExpense, { isLoading }] = useAddBusinessExpenseMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование статьи"),
    amount: yup.number().required("Укажите расход"),
    period: yup.string().required("Укажите период расхода"),
    note: yup.string().notRequired(),
  });

  const form = useForm(
    {
      name: "",
      amount: 0,
      period: ExpensePeriodEnum.MONTH,
      note: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBusinessExpense({
        name: form.values.name!,
        amount: form.values.amount!,
        period: form.values.period as ExpensePeriod,
        note: form.values.note || "",
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Статья ${form.values.name} успешно добавлена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении статьи`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.businessExpenseAdd}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Наименование статьи"
          placeholder="Наименование статьи бизнес-затрат"
          name="name"
          value={form.values.name!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.name)}
          errorMessage={form.fieldErrors.name}
        />
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <Input
              label="Расход"
              placeholder="Расход"
              name="amount"
              type="number"
              rightIcon={<RubleIcon />}
              value={form.values.amount!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.amount)}
              errorMessage={form.fieldErrors.amount}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Select
              label="Тип"
              value={form.values.period!}
              options={Object.entries(EXPENSE_PERIOD_LABELS).map(
                ([key, label]) => ({
                  value: key,
                  label,
                })
              )}
              onChange={(val) =>
                form.setFieldValue("period", val as ExpensePeriod)
              }
              error={Boolean(form.fieldErrors.period)}
              errorMessage={form.fieldErrors.period}
            />
          </div>
        </div>
        <Textarea
          label="Комментарий"
          placeholder="Укажите комментарий"
          value={form.values.note || ""}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="note"
          error={!!form.fieldErrors.note}
          errorMessage={form.fieldErrors.note}
          style={{ maxHeight: 150 }}
        />

        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить статью расчета
          </Button>
        </div>
      </form>
      <LoaderBlur isLoading={isLoading} />
    </div>
  );
};
