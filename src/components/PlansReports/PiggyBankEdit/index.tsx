import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./PiggyBankEdit.module.css";
import { useEditPiggyBankMutation, useGetPiggyBankQuery } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { RubleIcon } from "../../../assets/icons";
import { PiggyBankTypeEnum } from "../../../common/types";

interface PiggyBankEditProps {
  piggyBankId: string;
  onSuccess: () => void;
}

export const PiggyBankEdit = ({
  piggyBankId,
  onSuccess,
}: PiggyBankEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: piggyBank, isLoading } = useGetPiggyBankQuery(piggyBankId);

  const [editPiggyBank, { isLoading: isLoadingEdit }] =
    useEditPiggyBankMutation();

  const schema = yup.object({
    name: yup.string().required("Укажите наименование копилки"),
    plannedAmount: yup.number().required("Укажите планируемую сумму"),
  });

  const form = useForm(
    {
      name: piggyBank?.name || "",
      plannedAmount: piggyBank?.plannedAmount || undefined,
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!piggyBank) return;

    try {
      await editPiggyBank({
        id: piggyBankId,
        data: {
          name: form.values.name!,
          plannedAmount:
            piggyBank.type === PiggyBankTypeEnum.CUSTOM ||
            piggyBank.type === PiggyBankTypeEnum.PROFIT
              ? form.values.plannedAmount!
              : undefined,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Копилка успешно отредактирована`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании копилки`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  useEffect(() => {
    if (piggyBank) {
      form.setValues({
        name: piggyBank.name,
        plannedAmount: piggyBank.plannedAmount,
      });
    }
  }, [piggyBank]);

  if (isLoading) return <LoaderPage />;

  if (piggyBank)
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
            disabled={
              piggyBank.type === PiggyBankTypeEnum.BUSINESS_COST ||
              piggyBank.type === PiggyBankTypeEnum.SALARY
            }
          />
          <div className={styles.buttonsCont}>
            <Button type="submit" disabled={isLoading || !form.isValid}>
              Редактировать копилку
            </Button>
          </div>
        </form>
        <LoaderBlur isLoading={isLoadingEdit} />
      </div>
    );
};
