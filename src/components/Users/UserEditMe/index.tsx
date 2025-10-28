import * as yup from "yup";
import { useEditMeMutation, useGetUserMeQuery } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import LoaderPage from "../../ui/LoaderPage";
import { useEffect } from "react";

import styles from "./UserEditMe.module.css";
import { ApiError } from "../../../api/baseQuery";

interface UserEditMeProps {
  onSuccess: () => void;
}

export const UserEditMe = ({ onSuccess }: UserEditMeProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: user, isLoading: isLoadingUser } = useGetUserMeQuery();

  const [editUser, { isLoading: isLoadingEdit }] = useEditMeMutation();

  const schema = yup.object({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    login: yup.string().required("Логин обязателен"),
  });

  const form = useForm(
    {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      login: user?.login || "",
    },
    schema
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editUser({
        firstName: form.values.firstName!,
        lastName: form.values.lastName!,
        login: form.values.login!,
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Личная информация успешно изменена`,
        mode: "success",
      });
      onSuccess();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при редактировании личной информации`,
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
            Редактировать сотрудника
          </Button>
        </div>
      </form>
    </div>
  );
};
