import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useCreateMovementMutation } from "../../../api";
import { MoneyMovementTypeEnum } from "../../../common/types";
import { RubleIcon, ShuffleIcon } from "../../../assets/icons";
import { Textarea } from "../../ui/Textarea";
import clsx from "clsx";

import styles from "./MoneyDistribute.module.css";
import { DatePicker } from "../../ui/DatePicker";
import { FundSelector } from "../../Selectors";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface MoneyDistributeProps {
  onSuccess?: () => void;
}

export const MoneyDistribute = ({ onSuccess }: MoneyDistributeProps) => {
  const { showSnackbar } = useSnackbar();
  const [createMovement, { isLoading: isLoadingCreate }] =
    useCreateMovementMutation();

  const schema = yup.object({
    amount: yup
      .number()
      .typeError("Введите корректную сумму")
      .positive("Сумма должна быть положительной")
      .required("Сумма обязательна"),
    createdAt: yup.date().required(),
    fundId: yup.string().required("Выберите фонд"),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      amount: 0,
      createdAt: new Date(),
      fundId: "",
      comment: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement({
        type: MoneyMovementTypeEnum.TRANSFER,
        createdAt: (form.values.createdAt || new Date()).toISOString(),
        amount: Number(form.values.amount),
        fundToId: form.values.fundId || undefined,
        comment: form.values.comment!,
      }).unwrap();

      showSnackbar({
        title: "Успех",
        message: `Деньги успешно распределены`,
        mode: "success",
      });

      form.resetForm();
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Не удалось распределить деньги`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.moneyMovementHeader}>
          <p className={clsx("text_biggest_bold", styles.moneyMovementType)}>
            <ShuffleIcon color="var(--icons-orange)" />
            Распределить деньги
          </p>
        </div>
        <div className={styles.oneLineCont}>
          <div style={{ width: "50%" }}>
            <DatePicker
              value={form.values.createdAt}
              onChange={(date) => form.setFieldValue("createdAt", date)}
              label="Дата"
              error={Boolean(form.fieldErrors.createdAt)}
              errorMessage={form.fieldErrors.createdAt}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Input
              name="amount"
              label="Сумма"
              type="number"
              value={form.values.amount!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={!!form.fieldErrors.amount}
              errorMessage={form.fieldErrors.amount}
              rightIcon={<RubleIcon />}
            />
          </div>
        </div>
        <Textarea
          label="Комментарий"
          placeholder="Укажите назначение или комментарий"
          value={form.values.comment!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="comment"
          error={!!form.fieldErrors.comment}
          errorMessage={form.fieldErrors.comment}
          style={{ maxHeight: 150 }}
        />
        <FundSelector
          label="Выберите фонд для распределения"
          value={form.values.fundId || null}
          onChange={(val) => form.setFieldValue("fundId", val)}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingCreate || !form.isValid}>
            Распределить деньги
          </Button>
        </div>
      </div>
      <LoaderBlur isLoading={isLoadingCreate} />
    </form>
  );
};
