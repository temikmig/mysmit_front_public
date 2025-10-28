import type { ReactNode } from "react";

import styles from "./TableActions.module.css";
import { Tooltip } from "../Tooltip";

interface TableActionsProps {
  children: ReactNode;
}

export const TableActionsCont = ({ children }: TableActionsProps) => {
  return <div className={styles.tableActionsCont}>{children}</div>;
};

interface TableActionProps {
  tooltip?: string;
  icon: ReactNode;
  onClick: () => void;
}

export const TableAction = ({ tooltip, icon, onClick }: TableActionProps) => {
  return (
    <Tooltip
      text={tooltip}
      placement="top center"
      offsetY={4}
      withArrow
      show={Boolean(tooltip)}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        disabled={!tooltip}
      >
        {icon}
      </button>
    </Tooltip>
  );
};
