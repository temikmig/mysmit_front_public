import { Button, Stack } from "@mui/material";
import { FC } from "react";

import { User, UserPasswordDto } from "@entities/user";
import { useAuth } from "@features/auth";
import { FormPasswordField } from "@shared/ui/text-fields";

import { useUserPasswordForm } from "../../model";
import { usePasswordUser } from "../../model/usePasswordUser";


interface UserPasswordFormProps {
  user: User;
  onClose?: () => void;
}

export const UserPasswordForm: FC<UserPasswordFormProps> = ({
  user,
  onClose,
}) => {
  const { isAdmin } = useAuth();

  const { changePassword, isLoading } = usePasswordUser();

  const { control, handleSubmit } = useUserPasswordForm(isAdmin);

  const onSubmit = async (data: UserPasswordDto) => {
    await changePassword(user.id, data);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {!isAdmin && (
          <FormPasswordField
            name="currentPassword"
            control={control}
            label="Текущий пароль"
          />
        )}

        <FormPasswordField
          name="newPassword"
          control={control}
          label="Новый пароль"
        />

        {!isAdmin && (
          <FormPasswordField
            name="confirmPassword"
            control={control}
            label="Повторите новый пароль"
          />
        )}

        <Button type="submit" disabled={isLoading}>
          Сменить пароль
        </Button>
      </Stack>
    </form>
  );
};
