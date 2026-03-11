import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

import { UserMenuItem } from "../model";

export const menuItems: UserMenuItem[] = [
  {
    id: "profileCard",
    label: "Профиль",
    icon: <PersonIcon />,
  },
  {
    id: "profileEdit",
    label: "Настройки профиля",
    icon: <SettingsIcon />,
  },
  {
    id: "salary",
    label: "Зарплата",
    icon: <PaymentsIcon />,
  },
  {
    id: "profilePassword",
    label: "Сменить пароль",
    icon: <KeyIcon />,
  },
  { id: "logout", label: "Выйти", icon: <LogoutIcon /> },
];
