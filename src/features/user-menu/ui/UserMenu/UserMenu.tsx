import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "@entities/user";
import { useOpenLogoutModal } from "@features/auth";
import { useOpenEmployeeSalaryModal } from "@features/employee";
import {
  useOpenUserEditModal,
  useOpenUserPasswordModal,
  useOpenUserProfileModal,
} from "@features/user";
import { isMobileRequest } from "@shared/lib";

import { UserMenuItem } from "../../model";

interface UserMenuProps {
  items: UserMenuItem[];
  user: User;
}

export const UserMenu: FC<UserMenuProps> = ({ user, items }) => {
  const isMobile = isMobileRequest();
  const navigate = useNavigate();

  const openProfile = useOpenUserProfileModal();
  const openEdit = useOpenUserEditModal();
  const openPassword = useOpenUserPasswordModal();
  const openLogout = useOpenLogoutModal();
  const openSalary = useOpenEmployeeSalaryModal();

  const handleOpenProfile = () => {
    if (isMobile) {
      navigate("/m/profile");
      return;
    }
    openProfile(user.id);
  };

  const handleOpenSalary = () => {
    if (isMobile) {
      navigate("/m/salary");
      return;
    }
    if (user?.employee) {
      openSalary(user.employee.id);
    }
  };

  const handleClick = (id: (typeof items)[number]["id"]) => {
    switch (id) {
      case "profileCard":
        handleOpenProfile();
        break;
      case "profileEdit":
        openEdit(user.id);
        break;
      case "profilePassword":
        openPassword(user.id);
        break;
      case "salary":
        handleOpenSalary();
        break;
      case "logout":
        openLogout();
        break;
    }
  };

  return (
    <List>
      {items.map((item) => (
        <ListItemButton key={item.id} onClick={() => handleClick(item.id)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};
