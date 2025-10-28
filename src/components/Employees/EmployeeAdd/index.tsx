import * as yup from "yup";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useAddEmployeeMutation } from "../../../api";

import styles from "./EmployeeAdd.module.css";
import { ApiError } from "../../../api/baseQuery";

interface EmployeeAddProps {
  onSuccess: () => void;
  inputValue?: string;
}

export const EmployeeAdd = ({ onSuccess, inputValue }: EmployeeAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const schema = yup.object({
    firstName: yup.string().required("Укажите имя сотрудника"),
    lastName: yup.string().required("Укажите фамилию сотрудника"),
  });

  const form = useForm(
    {
      firstName: inputValue ? inputValue : "",
      lastName: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addEmployee({
        firstName: form.values.firstName!,
        lastName: form.values.lastName!,
      }).unwrap();

      showSnackbar({
        title: "Сообщение",
        message: `Сотрудник ${form.values.firstName} ${form.values.lastName} успешно добавлен`,
        mode: "success",
      });

      form.resetForm();
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при добавлении сотрудника`,
        addMessage: error.data.msg,
        mode: "error",
      });
    }
  };

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
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить сотрудника
          </Button>
        </div>
      </form>
    </div>
  );
};
