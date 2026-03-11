import { useSnackbar } from "notistack";

import { setUser } from "@entities/user";
import { type LoginDto, setToken, useLoginMutation } from "@features/auth";
import { ApiError } from "@shared/api";
import { useAppDispatch } from "@shared/lib";

export const useLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [loginApi, { isLoading, error }] = useLoginMutation();

  const login = async (data: LoginDto, onSuccess?: () => void) => {
    try {
      const response = await loginApi(data).unwrap();

      dispatch(setToken({ accessToken: response.accessToken }));
      dispatch(setUser({ user: response.user }));
      onSuccess?.();
    } catch (err) {
      const error = err as ApiError;
      enqueueSnackbar(error.data.msg, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    }
  };
  return { login, isLoading, error };
};
