import { forwardRef, type ReactNode } from "react";
import clsx from "clsx";
import { Tooltip } from "../Tooltip";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  tooltip?: string;
  icon: ReactNode;
  size?: "big" | "medium" | "small";
  variant?: "primary" | "outline";
  onClick: () => void;
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { tooltip, icon, size = "medium", variant = "primary", onClick, className },
    ref
  ) => {
    return (
      <Tooltip
        text={tooltip}
        placement="top center"
        offsetY={4}
        withArrow
        show={Boolean(tooltip)}
      >
        <button
          className={clsx(
            styles.iconButton,
            styles[size],
            styles[variant],
            className
          )}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          ref={ref}
        >
          {icon}
        </button>
      </Tooltip>
    );
  }
);

IconButton.displayName = "IconButton";
