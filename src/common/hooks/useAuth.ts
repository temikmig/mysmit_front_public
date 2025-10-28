import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { UserRoleEnum } from "../types";

export const useAuth = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const isAuth = Boolean(accessToken);
  const isAdmin = user?.role === UserRoleEnum.ADMIN;

  return { isAuth, isAdmin, user };
};
