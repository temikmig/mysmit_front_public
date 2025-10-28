import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation, authApi, usersApi } from "../../api";
import { setAuth } from "../../store/slices/authSlice";
import { Loader } from "../../components/ui/Loader";

export const LogoutPage = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout().unwrap();
        dispatch(setAuth({ accessToken: null, user: null }));
        dispatch(authApi.util.resetApiState());
        dispatch(usersApi.util.resetApiState());

        navigate("/login", { replace: true });
      } catch (err) {
        console.error("Logout error", err);
      }
    };

    doLogout();
  }, [dispatch, logout, navigate]);

  return <Loader fullscreen text />;
};
