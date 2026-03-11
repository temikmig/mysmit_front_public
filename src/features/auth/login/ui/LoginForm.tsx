import { Button, TextField } from "@mui/material";

import { RedlineLogo } from "@shared/assets";
import { PasswordField } from "@shared/ui/text-fields";

import { LoginDto } from "../model";
import { FormStyled, PaperStyled } from "./LoginForm.styled";
import { useLogin } from "../model/useLogin";
import { useLoginForm } from "../model/useLoginForm";

export const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit } = useLoginForm();

  const onSubmit = async (data: LoginDto) => {
    await login(data);
  };

  return (
    <PaperStyled>
      <RedlineLogo width={240} />
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Логин" {...register("login")} />
        <PasswordField
          label="Пароль"
          type="password"
          {...register("password")}
        />
        <Button
          size="large"
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Войти
        </Button>
      </FormStyled>
    </PaperStyled>
  );
};
