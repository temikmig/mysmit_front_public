import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./BusinessExpenseEdit.module.css";
import {
  useEditBusinessExpenseMutation,
  useGetBusinessExpenseByIdQuery,
} from "../../../api";
import { ApiError } from "../../../api/baseQuery";
import {
  EXPENSE_PERIOD_LABELS,
  ExpensePeriod,
  ExpensePeriodEnum,
} from "../../../common/types";
import { RubleIcon } from "../../../assets/icons";
import { Select } from "../../ui/Select";
import { LoaderBlur } from "../../ui/LoaderBlur";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { Textarea } from "../../ui/Textarea";

interface BusinessExpenseEditProps {
  businessExpenseId: string;
  onSuccess: () => void;
}

export const BusinessExpenseEdit = ({
  businessExpenseId,
  onSuccess,
}: BusinessExpenseEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: businessExpense, isLoading: isLoadingBusinessExpense } =
    useGetBusinessExpenseByIdQuery(businessExpenseId);

  const [editBusinessExpense, { isLoading: isLoadingEdit }] =
    useEditBusinessExpenseMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование статьи"),
    amount: yup.number().required("Укажите расход"),
    period: yup.string().required("Укажите период расхода"),
    note: yup.string().notRequired(),
  });

  const form = useForm(
    {
      name: businessExpense?.name || "",
      amount: businessExpense?.amount || 0,
      period: businessExpense?.period || ExpensePeriodEnum.MONTH,
      note: businessExpense?.note || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editBusinessExpense({
        id: businessExpenseId,
        data: {
          name: form.values.name!,
          amount: form.values.amount!,
          period: form.values.period as ExpensePeriod,
          note: form.values.note || "",
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Статья ${form.values.name} успешно отредактирована`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании статьи`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (businessExpense) {
      form.setValues({
        name: businessExpense.name,
        amount: businessExpense.amount,
        period: businessExpense.period,
        note: businessExpense.note,
      });
    }
  }, [businessExpense]);

  if (isLoadingBusinessExpense) return <LoaderPage />;

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
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать статью расчета
          </Button>
        </div>
      </form>
      <LoaderBlur isLoading={isLoadingEdit} />
    </div>
  );
};
