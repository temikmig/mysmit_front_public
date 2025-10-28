import * as yup from "yup";
import { useEditUserMutation, useGetUserQuery } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import { ROLE_LABELS, type UserRole } from "../../../common/types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Select } from "../../ui/Select";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";

import styles from "./UserEdit.module.css";
import { ApiError } from "../../../api/baseQuery";

interface UserEditProps {
  userId: string;
  onSuccess: () => void;
}

export const UserEdit = ({ userId, onSuccess }: UserEditProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId);

  const [editUser, { isLoading: isLoadingEdit }] = useEditUserMutation();

  const schema = yup.object({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    login: yup.string().required("Логин обязателен"),
    role: yup.string().required("Выберите роль"),
  });

  const form = useForm(
    {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      login: user?.login || "",
      role: user?.role || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      await editUser({
        id: user.id,
        data: {
          firstName: form.values.firstName!,
          lastName: form.values.lastName!,
          login: form.values.login!,
          role: form.values.role as UserRole,
        },
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Информация о сотруднике успешно изменена`,
        mode: "success",
      });
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

  const isLoading = isLoadingUser || isLoadingEdit;

  useEffect(() => {
    if (user) {
      form.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        role: user.role,
      });
    }
  }, [user]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.userEditCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
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
        <Input
          label="Логин"
          name="login"
          value={form.values.login!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.login)}
          errorMessage={form.fieldErrors.login}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoading || !form.isValid}>
            Редактировать пользователя
          </Button>
        </div>
      </form>
    </div>
  );
};
