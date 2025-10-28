import { useNavigate } from "react-router-dom";
import styles from "./SidebarMenuItem.module.css";
import clsx from "clsx";
import type { ReactNode } from "react";
import { AngleDownMinIcon } from "../../../assets/icons";

export interface SidebarMenuItemProps {
  title: string;
  icon?: ReactNode;
  navTo?: string;
  onClick?: () => void;
  dev?: boolean;
  children?: SidebarMenuItemProps[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SidebarMenuItem = ({
  title,
  icon,
  navTo,
  onClick,
  dev = false,
  children,
  isOpen = false,
  onToggle,
}: SidebarMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (children && children.length > 0) {
      onToggle?.();
      return;
    }

    if (navTo && !onClick) navigate(navTo);
    if (onClick && !navTo) onClick();
  };

  return (
    <li className={styles.sidebarMenuLi}>
      <div
        className={clsx(
          styles.sidebarMenuItem,
          "text_small",
          dev && styles.dev
        )}
        onClick={handleClick}
      >
        <div className={styles.sidebarMenuTitle}>
          {icon}
          {title}
        </div>
        {children && (
          <AngleDownMinIcon
            className={clsx(styles.arrowIcon, isOpen && styles.open)}
          />
        )}
      </div>

      {children && (
        <ul className={clsx(styles.submenu, isOpen && styles.open)}>
          {isOpen &&
            children.map((child) => (
              <SidebarMenuItem key={child.title} {...child} />
            ))}
        </ul>
      )}
    </li>
  );
};
