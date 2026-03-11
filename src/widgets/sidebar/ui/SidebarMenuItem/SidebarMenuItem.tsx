import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tooltip } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { MenuCont, MenuButton } from "./SidebarMenuItem.styled";


export interface SidebarMenuItemProps {
  title: string;
  icon?: ReactNode;
  navTo?: string;
  onClick?: () => void;
  onToggle?: () => void;
  disabled?: boolean;
  dev?: boolean;
  isOpen?: boolean;
  isItemOpen?: boolean;
  isSub?: boolean;
  children?: SidebarMenuItemProps[];
}

export const SidebarMenuItem = ({
  title,
  icon,
  navTo,
  onClick,
  onToggle,
  disabled = false,
  isOpen = false,
  isItemOpen = false,
  isSub = false,
  children,
}: SidebarMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (children && children.length > 0) {
      onToggle?.();
      return;
    }

    if (disabled) return;

    if (navTo && !onClick) navigate(navTo);
    if (onClick && !navTo) onClick();
  };

  const menuButton = isOpen ? (
    <>
      <MenuButton
        isSub={isSub}
        disabled={disabled}
        variant="text"
        size="small"
        onClick={handleClick}
        startIcon={icon}
        endIcon={
          children &&
          (isItemOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)
        }
      >
        {title}
      </MenuButton>
      {children && (
        <>
          {isItemOpen &&
            children.map((child) => (
              <SidebarMenuItem key={child.title} isSub isOpen {...child} />
            ))}
        </>
      )}
    </>
  ) : (
    <Tooltip title={title} placement="right">
      <MenuButton
        disabled={disabled}
        variant="text"
        size="small"
        onClick={handleClick}
        startIcon={icon}
        isSub={false}
      />
    </Tooltip>
  );

  return isItemOpen ? (
    isOpen ? (
      <MenuCont>{menuButton}</MenuCont>
    ) : (
      menuButton
    )
  ) : (
    menuButton
  );
};
