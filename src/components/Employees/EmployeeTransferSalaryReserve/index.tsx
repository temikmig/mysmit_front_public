import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import {
  useGetEmployeeQuery,
  useGetReserveFundQuery,
  useTransferEmployeeSalaryReserveMutation,
} from "../../../api";
import { PlusMinIcon, RubleIcon } from "../../../assets/icons";
import { Textarea } from "../../ui/Textarea";

import styles from "./EmployeeTransferSalaryReserve.module.css";
import { ApiError } from "../../../api/baseQuery";
import { LoaderBlur } from "../../ui/LoaderBlur";
import { EmployeeSelector } from "../../Selectors/EmployeeSelector";
import { useHandlers } from "../../../common/hooks";
import { Select } from "../../ui/Select";
import { useState } from "react";
import { DataGrid, DataGridItem } from "../../ui/DataGrid";
import LoaderPage from "../../ui/LoaderPage";
import { moneyFormat } from "../../../common/functions";

interface EmployeeTransferSalaryReserveProps {
  employeeId: string;
  onSuccess?: () => void;
}

export const EmployeeTransferSalaryReserve = ({
  employeeId,
  onSuccess,
}: EmployeeTransferSalaryReserveProps) => {
  const { showSnackbar } = useSnackbar();
  const [createMovement, { isLoading: isLoadingCreate }] =
    useTransferEmployeeSalaryReserveMutation();

  const {
    data: employee,
    isLoading,
    refetch: refetchEmployee,
  } = useGetEmployeeQuery(employeeId);

  const {
    data: reserveFund,
    isLoading: reserveFundLoading,
    refetch: refetchFund,
  } = useGetReserveFundQuery();

  const [transferMode, setTransferMode] = useState<
    "INCRACE" | "DECRACE" | "TRANSFER"
  >("INCRACE");

  const { handleEmployeeAdd } = useHandlers();

  const schema = yup.object({
    amount: yup
      .number()
      .typeError("Введите корректную сумму")
      .positive("Сумма должна быть положительной")
      .required("Сумма обязательна"),
    toEmployeeId: yup
      .string()
      .test("required-if-transfer", "Укажите сотрудника", (value) => {
        if (transferMode === "TRANSFER") {
          return Boolean(value && value.trim() !== "");
        }
        return true;
      }),
    comment: yup.string().required("Укажите комментарий"),
  });

  const form = useForm(
    {
      amount: 0,
      toEmployeeId: "",
      comment: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement({
        fromEmployeeId: employeeId,
        amount: form.values.amount!,
        toEmployeeId: form.values.toEmployeeId || "",
        transferMode: transferMode,
        comment: form.values.comment || "",
      }).unwrap();
      showSnackbar({
        title: "Успех",
        message: `Резерв зарплаты успешно перемещен`,
        mode: "success",
      });
      form.resetForm();
      onSuccess?.();
      refetchEmployee();
      refetchFund();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Не удалось переместить резерв зарплаты`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const dataItems: DataGridItem[] =
    (employee &&
      reserveFund && [
        {
          title: "Резерв",
          description: `${moneyFormat(employee.salaryBalance)}`,
        },
        {
          title: "Номинально",
          description: `${moneyFormat(employee.nominalSalaryBalance)}`,
        },
        {
          title: "Резервный фонд",
          description: `${moneyFormat(reserveFund.balance)}`,
        },
      ]) ||
    [];

  const handleTransferMode = (val: "INCRACE" | "DECRACE" | "TRANSFER") => {
    setTransferMode(val);
    form.setFieldValue("toEmployeeId", "");
  };

  if (isLoading || reserveFundLoading) return <LoaderPage />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <DataGrid items={dataItems} />
        <div className={styles.oneLineCont}>
          <div className={styles.oneRowCont} style={{ width: "50%" }}>
            <Select
              label="Действие"
              value={transferMode}
              options={[
                { label: "Зачислить", value: "INCRACE" },
                { label: "Списать", value: "DECRACE" },
                { label: "Переместить", value: "TRANSFER" },
              ]}
              onChange={(val) => {
                handleTransferMode(val as "INCRACE" | "DECRACE" | "TRANSFER");
              }}
            />
            {transferMode === "TRANSFER" && (
              <EmployeeSelector
                label="Переместить на сотрудника"
                value={form.values.toEmployeeId || ""}
                onChange={(val) => form.setFieldValue("toEmployeeId", val)}
                actions={[
                  {
                    label: "Добавить сотрудника",
                    icon: <PlusMinIcon />,
                    onClick: (currentInput) => {
                      handleEmployeeAdd(undefined, currentInput as string);
                    },
                  },
                ]}
              />
            )}
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
