import * as yup from "yup";
import { useEditUserMutation, useGetUserQuery } from "../../../api/usersApi";
import { useForm } from "../../../common/hooks/useForm";
import { useSnackbar } from "../../../common/hooks/useSnackbar";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import LoaderPage from "../../ui/LoaderPage";

import styles from "./UserEditPassword.module.css";

interface UserEditPasswordProps {
  userId: string;
  onSuccess: () => void;
}

export const UserEditPassword = ({
  userId,
  onSuccess,
}: UserEditPasswordProps) => {
  const { showSnackbar } = useSnackbar();

  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId);

  const [editUser, { isLoading: isLoadingEdit }] = useEditUserMutation();

  const schema = yup.object({
    password: yup
      .string()
      .min(6, "Минимум 6 символов")
      .required("Пароль обязателен"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль"),
  });

  const form = useForm(
    {
      password: "",
      confirmPassword: "",
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
          password: form.values.password!,
        },
      }).unwrap();

      form.resetForm();
      showSnackbar({
        title: "Сообщение",
        message: `Пароль пользователя успешно изменен`,
        mode: "success",
      });
      onSuccess();
    } catch {
      showSnackbar({
        title: "Ошибка",
        message: `Возникла ошибка при изменении пароля пользователя`,
        mode: "error",
      });
    }
  };

  const isLoading = isLoadingUser || isLoadingEdit;

  if (isLoading) return <LoaderPage />;

  return (
    <div className={styles.userEditCont}>
      <form className={styles.formCont} onSubmit={handleSubmit}>
        <Input
          label="Новый пароль"
          name="password"
          type="password"
          value={form.values.password!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.password)}
          errorMessage={form.fieldErrors.password}
        />
        <Input
          label="Повторите новый пароль"
          name="confirmPassword"
          type="password"
          value={form.values.confirmPassword!}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.fieldErrors.confirmPassword)}
          errorMessage={form.fieldErrors.confirmPassword}
        />
        <div className={styles.buttonsCont}>
          <Button type="submit" disabled={isLoadingEdit || !form.isValid}>
            Изменить пароль
          </Button>
        </div>
      </form>
    </div>
  );
};
