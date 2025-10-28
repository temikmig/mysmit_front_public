import * as yup from "yup";
import { useForm } from "../../common/hooks/useForm";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { SmitLogo } from "../../assets/logo/SmitLogo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useSnackbar } from "../../common/hooks/useSnackbar";

import styles from "./Login.module.css";
import { LoginIcon } from "../../assets/icons";
import { ApiError } from "../../api/baseQuery";
import { LoginRequest } from "../../common/types";

export const LoginPage = () => {
  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginApi, { isLoading }] = useLoginMutation();

  const schema = yup.object({
    login: yup.string().required(),
    password: yup.string().required(),
  });

  const form = useForm({ login: "", password: "" }, schema);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginApi(form.values as LoginRequest).unwrap();
      dispatch(setAuth({ accessToken: data.accessToken, user: data.user }));
      navigate("/dashboard");
    } catch (err) {
      const error = err as ApiError;
      showSnackbar({
        title: "Внимание",
        message: error.data.msg,
        mode: "error",
      });
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCont}>
        <div className={styles.logoCont}>
          <SmitLogo color="#041626" />
        </div>
        <form className={styles.formCont} onSubmit={handleSubmit}>
          <Input
            label="Логин"
            name="login"
            value={form.values.login!}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            value={form.values.password!}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <div className={styles.buttonsCont}>
            <Button type="submit" disabled={isLoading} icon={<LoginIcon />}>
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
