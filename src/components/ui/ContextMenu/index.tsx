import clsx from "clsx";
import React, { type RefObject } from "react";
import styles from "./ContextMenu.module.css";
import { Dropdown, type Placement } from "../Dropdown";

export interface ContextMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  color: "default" | "blue" | "red" | "green" | "orange";
  onClick: () => void;
}

interface ContextMenuProps {
  anchorRef: RefObject<HTMLElement | null>;
  items: ContextMenuItem[];
  open: boolean;
  onClose: () => void;
  placement?: Placement;
  offsetX?: number;
  offsetY?: number;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorRef,
  items,
  open,
  onClose,
  placement = "top end",
  offsetX = 0,
  offsetY = 8,
}) => {
  const [currentPlacement, setCurrentPlacement] =
    React.useState<Placement>(placement);

  return (
    <Dropdown
      anchorRef={anchorRef}
      open={open}
      onClose={onClose}
      offsetX={offsetX}
      offsetY={offsetY}
      placement={currentPlacement}
      withShadow
      onPlacementChange={setCurrentPlacement}
    >
      <div className={styles.contextMenuCont}>
        {items.map((item) => (
          <div
            key={item.id}
            className={clsx(styles.contextMenuItem, {
              [styles.blue]: item.color === "blue",
              [styles.red]: item.color === "red",
              [styles.green]: item.color === "green",
              [styles.orange]: item.color === "orange",
            })}
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};
