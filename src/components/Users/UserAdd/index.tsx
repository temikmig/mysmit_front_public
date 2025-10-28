import * as yup from "yup";
import { useAddUserMutation } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import { ROLE_LABELS, type UserRole } from "../../../common/types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Select } from "../../ui/Select";
import styles from "./UserAdd.module.css";
import { ApiError } from "../../../api/baseQuery";

interface UserAddProps {
  onSuccess: () => void;
}

export const UserAdd = ({ onSuccess }: UserAddProps) => {
  const { showSnackbar } = useSnackbar();

  const [addUser, { isLoading }] = useAddUserMutation();

  const schema = yup.object({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    login: yup.string().required("Логин обязателен"),
    password: yup
      .string()
      .min(6, "Минимум 6 символов")
      .required("Пароль обязателен"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль"),
    role: yup.string().required("Выберите роль"),
  });

  const form = useForm(
    {
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addUser({
        firstName: form.values.firstName!,
        lastName: form.values.lastName!,
        login: form.values.login!,
        password: form.values.password!,
        role: form.values.role as UserRole,
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Сотрудник ${form.values.firstName} ${form.values.lastName} успешно добавлен`,
        mode: "success",
      });
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
    <div className={styles.userAddCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <div className={styles.formWrap}>
          <div className={styles.form}>
            <Input
              label="Имя"
              name="firstName"
              value={form.values.firstName!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.firstName)}
              errorMessage={form.fieldErrors.firstName}
            />
            <Input
              label="Фамилия"
              name="lastName"
              value={form.values.lastName!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.lastName)}
              errorMessage={form.fieldErrors.lastName}
            />
            <Select
              label="Роль"
              value={form.values.role!}
              options={Object.entries(ROLE_LABELS).map(([key, label]) => ({
                value: key,
                label,
              }))}
              onChange={(val) => form.setFieldValue("role", val as UserRole)}
              error={Boolean(form.fieldErrors.role)}
              errorMessage={form.fieldErrors.role}
            />
          </div>
          <div className={styles.form}>
            <Input
              label="Логин"
              name="login"
              value={form.values.login!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.login)}
              errorMessage={form.fieldErrors.login}
            />
            <Input
              label="Пароль"
              name="password"
              type="password"
              value={form.values.password!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.password)}
              errorMessage={form.fieldErrors.password}
            />
            <Input
              label="Повторите пароль"
              name="confirmPassword"
              type="password"
              value={form.values.confirmPassword!}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={Boolean(form.fieldErrors.confirmPassword)}
              errorMessage={form.fieldErrors.confirmPassword}
            />
          </div>
        </div>
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Добавить пользователя
          </Button>
        </div>
      </form>
    </div>
  );
};
