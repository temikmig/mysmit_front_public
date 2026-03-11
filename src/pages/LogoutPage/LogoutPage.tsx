import { useLogout } from "@features/auth";
import { Loader } from "@shared/ui";

export const LogoutPage = () => {
  useLogout();
  return <Loader fullscreen text />;
};
