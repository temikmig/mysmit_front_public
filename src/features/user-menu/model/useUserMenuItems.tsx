import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

import { useAuth } from "@features/auth";

import { UserMenuItem } from "./types";

export const useUserMenuItems = (): UserMenuItem[] => {
  const { user } = useAuth();

  const items: UserMenuItem[] = [
    { id: "profileCard", label: "Профиль", icon: <PersonIcon /> },
    { id: "profileEdit", label: "Настройки профиля", icon: <SettingsIcon /> },
    { id: "profilePassword", label: "Сменить пароль", icon: <KeyIcon /> },
    { id: "logout", label: "Выйти", icon: <LogoutIcon /> },
  ];

  if (user?.employee) {
    items.splice(2, 0, {
      id: "salary",
      label: "Зарплата",
      icon: <PaymentsIcon />,
    });
  }

  return items;
};
