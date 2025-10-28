import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import {
  useGetEmployeeQuery,
  useGetSalaryFundQuery,
  useTransferEmployeeSalaryMutation,
} from "../../../api";
import { RubleIcon } from "../../../assets/icons";
import { Textarea } from "../../ui/Textarea";

import styles from "./EmployeeTransferSalary.module.css";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";

import LoaderPage from "../../ui/LoaderPage";
import { DataGridItem, DataGrid } from "../../ui/DataGrid";
import { moneyFormat } from "../../../common/functions";

interface EmployeeTransferSalaryProps {
  employeeId: string;
  onSuccess?: () => void;
}

export const EmployeeTransferSalary = ({
  employeeId,
  onSuccess,
}: EmployeeTransferSalaryProps) => {
  const { showSnackbar } = useSnackbar();
  const [createTransfer, { isLoading: isLoadingCreate }] =
    useTransferEmployeeSalaryMutation();

  const { data: employee, isLoading } = useGetEmployeeQuery(employeeId);
  const { data: fund } = useGetSalaryFundQuery();

  const dataItems: DataGridItem[] =
    (employee &&
      fund && [
        {
          title: "Имя сотрудника",
          description: `${employee.firstName} ${employee.lastName}`,
        },
        {
          title: "Резерв",
          description: `${moneyFormat(employee.salaryBalance)}`,
        },
        {
          title: "Номинально",
          description: `${moneyFormat(employee.nominalSalaryBalance)}`,
        },
        {
          title: "Баланс фонда",
          description: `${moneyFormat(fund.balance)}`,
        },
      ]) ||
    [];

  const schema = yup.object({
    amount: yup
      .number()
      .typeError("Введите корректную сумму")
      .positive("Сумма должна быть положительной")
      .required("Сумма обязательна"),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      amount: 0,
      comment: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransfer({
        employeeId,
        amount: form.values.amount!,
        comment: form.values.comment || "",
      }).unwrap();
      showSnackbar({
        title: "Успех",
        message: `Зарплата успешно начислена`,
        mode: "success",
      });
      form.resetForm();
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Не удалось начислить зарплату`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  if (isLoading) return <LoaderPage />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <DataGrid items={dataItems} />
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

        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingCreate || !form.isValid}>
            Начислить зарплату
          </Button>
        </div>
      </div>
      <LoaderBlur isLoading={isLoadingCreate} />
    </form>
  );
};
