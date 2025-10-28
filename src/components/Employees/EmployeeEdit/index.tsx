import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./EmployeeEdit.module.css";
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../../../api";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";
import { ApiError } from "../../../api/baseQuery";

interface EmployeeEditProps {
  employeeId: string;
  onSuccess: () => void;
}

export const EmployeeEdit = ({ employeeId, onSuccess }: EmployeeEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: employee, isLoading: isLoadingEmployee } =
    useGetEmployeeQuery(employeeId);

  const [editEmployee, { isLoading: isLoadingEdit }] =
    useEditEmployeeMutation();

  const schema = yup.object({
    firstName: yup.string().required("Укажите имя сотрудника"),
    lastName: yup.string().required("Укажите фамилию сотрудника"),
  });

  const form = useForm(
    {
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employee) return;

    try {
      await editEmployee({
        id: employee.id,
        data: {
          firstName: form.values.firstName!,
          lastName: form.values.lastName!,
        },
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Информация о сотруднике успешно изменена`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании сотрудника`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingEmployee || isLoadingEdit;

  useEffect(() => {
    if (employee) {
      form.setValues({
        firstName: employee.firstName,
        lastName: employee.lastName,
      });
    }
  }, [employee]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.employeeAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Имя сотрудника"
          placeholder="Укажите имя сотрудника"
          name="firstName"
          value={form.values.firstName!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.firstName)}
          errorMessage={form.fieldErrors.firstName}
        />
        <Input
          label="Фамилия сотрудника"
          name="lastName"
          placeholder="Укажите фамилию сотрудника"
          value={form.values.lastName!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.lastName)}
          errorMessage={form.fieldErrors.lastName}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Редактировать сотрудника
          </Button>
        </div>
      </form>
    </div>
  );
};
