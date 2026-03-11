import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSidebarOpen, setSidebarOpen } from "@entities/ui";
import { NotificationsPopover } from "@features/notifications";
import { UserMenuPopover } from "@features/user-menu";
import { RedlineLogo } from "@shared/assets";

import { HeaderButton, HeaderRoot, HeaderBox } from "./Header.styled";

interface HeaderProps {
  sidebarButton?: boolean;
}

export const Header: FC<HeaderProps> = ({ sidebarButton = true }) => {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector(getSidebarOpen);

  const handleOpenMenu = () => {
    dispatch(setSidebarOpen(!isSidebarOpen));
  };

  return (
    <HeaderRoot>
      <HeaderBox>
        {sidebarButton && (
          <HeaderButton onClick={handleOpenMenu}>
            <MenuIcon />
          </HeaderButton>
        )}
        <RedlineLogo />
      </HeaderBox>
      <HeaderBox>
        <NotificationsPopover />
        <UserMenuPopover />
      </HeaderBox>
    </HeaderRoot>
  );
};
