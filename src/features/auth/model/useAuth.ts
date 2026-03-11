import { DEFAULT_USERPERMISSIONS, UserRoleEnum } from "@entities/user";
import { useAppSelector } from "@shared/lib";

export const useAuth = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.user);

  const isAuth = Boolean(accessToken);

  const isAdmin = user?.role === UserRoleEnum.ADMIN || false;
  const permissions = user?.permissions ?? DEFAULT_USERPERMISSIONS;

  return { isAuth, isAdmin, user, permissions };
};
