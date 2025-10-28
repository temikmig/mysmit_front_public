import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useCreateMovementMutation, useGetFundQuery } from "../../../api";
import { MoneyMovementTypeEnum } from "../../../common/types";
import { RubleIcon, ShuffleIcon } from "../../../assets/icons";
import { Textarea } from "../../ui/Textarea";
import LoaderPage from "../../ui/LoaderPage";
import clsx from "clsx";

import styles from "./MoneyTransfer.module.css";
import { DatePicker } from "../../ui/DatePicker";
import { FundSelector } from "../../Selectors";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface MoneyTransferProps {
  fundFromId: string;
  onSuccess?: () => void;
}

export const MoneyTransfer = ({
  fundFromId,
  onSuccess,
}: MoneyTransferProps) => {
  const { showSnackbar } = useSnackbar();
  const [createMovement, { isLoading: isLoadingCreate }] =
    useCreateMovementMutation();

  const { data: fund, isLoading: isLoadingFund } = useGetFundQuery(fundFromId);

  const schema = yup.object({
    amount: yup
      .number()
      .typeError("Введите корректную сумму")
      .positive("Сумма должна быть положительной")
      .required("Сумма обязательна"),
    createdAt: yup.date().required(),
    fundId: yup.string().required(),
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
        fundFromId: fundFromId,
        fundToId: form.values.fundId || undefined,
        comment: form.values.comment!,
      }).unwrap();

      showSnackbar({
        title: "Успех",
        message: `Деньги успешно перемещены`,
        mode: "success",
      });

      form.resetForm();
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Не удалось переместить деньги`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  if (isLoadingFund) return <LoaderPage />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.moneyMovementHeader}>
          <p className={clsx("text_biggest_bold", styles.moneyMovementType)}>
            <ShuffleIcon color="var(--icons-orange)" />
            Переместить деньги из
          </p>
          <p className={clsx("text_biggest_bold", styles.moneyMovementTo)}>
            {fund?.name}
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
          label="Фонд для пополнения"
          value={form.values.fundId || null}
          onChange={(val) => form.setFieldValue("fundId", val)}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingCreate || !form.isValid}>
            Переместить деньги
          </Button>
        </div>
      </div>
      <LoaderBlur isLoading={isLoadingCreate} />
    </form>
  );
};
