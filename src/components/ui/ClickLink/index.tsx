import type { ReactNode } from "react";
import styles from "./ClickLink.module.css";
import { clsx } from "clsx";

interface ClickLinkProps {
  children: ReactNode;
  onClick: () => void;
}

export const ClickLink = ({ children, onClick }: ClickLinkProps) => {
  return (
    <span className={clsx(styles.clickLinkStyle)} onClick={onClick}>
      {children}
    </span>
  );
};
