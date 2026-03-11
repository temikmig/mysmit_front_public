import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { clearUser, userApi } from "@entities/user";
import { clearToken } from "@features/auth/model";
import { useAppDispatch } from "@shared/lib";

import { useLogoutMutation } from "../api";

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout().unwrap();

        dispatch(clearToken());
        dispatch(clearUser());

        dispatch(userApi.util.resetApiState());

        navigate("/login", { replace: true });
      } catch (err) {
        console.error("Logout error", err);
      }
    };

    doLogout();
  }, [dispatch, logout, navigate]);
};
