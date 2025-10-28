import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useCreateMovementMutation, useGetSourceQuery } from "../../../api";
import {
  MoneyMovementType,
  MoneyMovementTypeEnum,
} from "../../../common/types";
import { ArrowDownIcon, ArrowUpIcon, RubleIcon } from "../../../assets/icons";
import { Textarea } from "../../ui/Textarea";
import LoaderPage from "../../ui/LoaderPage";
import clsx from "clsx";
import { DatePicker } from "../../ui/DatePicker";
import { FundSelector } from "../../Selectors";

import styles from "./MoneySourceMovement.module.css";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

interface MoneySourceMovementProps {
  type: MoneyMovementType;
  sourceId: string;
  onSuccess?: () => void;
}

export const MoneySourceMovement = ({
  type,
  sourceId,
  onSuccess,
}: MoneySourceMovementProps) => {
  const { showSnackbar } = useSnackbar();
  const [createMovement, { isLoading: isLoadingCreate }] =
    useCreateMovementMutation();

  const { data: source, isLoading: isLoadingSource } =
    useGetSourceQuery(sourceId);

  const schema = yup.object({
    amount: yup
      .number()
      .typeError("Введите корректную сумму")
      .positive("Сумма должна быть положительной")
      .required("Сумма обязательна"),
    createdAt: yup.date().required(),
    fundId: yup.string().nullable(),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      amount: 0,
      createdAt: new Date(),
      fundId: null,
      comment: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement({
        type: type,
        amount: Number(form.values.amount),
        createdAt: (form.values.createdAt || new Date()).toISOString(),
        sourceToId:
          type === MoneyMovementTypeEnum.INCOME ? sourceId : undefined,
        sourceFromId:
          type === MoneyMovementTypeEnum.OUTCOME ? sourceId : undefined,
        fundToId:
          type === MoneyMovementTypeEnum.INCOME
            ? form.values.fundId || undefined
            : undefined,
        fundFromId:
          type === MoneyMovementTypeEnum.OUTCOME
            ? form.values.fundId || undefined
            : undefined,
        comment: form.values.comment!,
      }).unwrap();

      showSnackbar({
        title: "Успех",
        message: `Деньги успешно ${
          type === MoneyMovementTypeEnum.INCOME ? `зачислены` : `сняты`
        }`,
        mode: "success",
      });

      form.resetForm();
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Не удалось ${
          type === MoneyMovementTypeEnum.INCOME ? `зачислить` : `снять`
        }  деньги`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  if (isLoadingSource) return <LoaderPage />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.moneyMovementHeader}>
          <p
            className={clsx(
              "text_biggest_bold",
              styles.moneyMovementType,
              styles[type]
            )}
          >
            {type === MoneyMovementTypeEnum.INCOME && (
              <ArrowDownIcon color="var(--icons-green)" />
            )}
            {type === MoneyMovementTypeEnum.OUTCOME && (
              <ArrowUpIcon color="var(--icons-red)" />
            )}
            {`${
              type === MoneyMovementTypeEnum.INCOME
                ? `Зачислить деньги`
                : `Снять деньги`
            }`}
          </p>
          <p className={clsx("text_biggest_bold", styles.moneyMovementTo)}>
            {source?.name}
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
          label={`${
            type === MoneyMovementTypeEnum.INCOME
              ? `Распределить сразу в фонд`
              : `Снять сразу из фонда`
          }`}
          value={form.values.fundId || null}
          onChange={(val) => form.setFieldValue("fundId", val)}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingCreate || !form.isValid}>
            {`${
              type === MoneyMovementTypeEnum.INCOME
                ? `Зачислить деньги${
                    form.values.fundId ? " и распределить" : ""
                  }`
                : `Снять деньги из${
                    form.values.fundId ? " фонда" : " нераспределенных"
                  }`
            }`}
          </Button>
        </div>
      </div>
      <LoaderBlur isLoading={isLoadingCreate} />
    </form>
  );
};
