import { useRef, useState, type ReactNode } from "react";
import { Dropdown, type Placement } from "../Dropdown";
import styles from "./Tooltip.module.css";
import clsx from "clsx";

interface TooltipProps {
  text: ReactNode;
  children: ReactNode;
  placement?: Placement;
  offsetX?: number;
  offsetY?: number;
  delay?: number;
  withArrow?: boolean;
  show?: boolean;
}

export const Tooltip = ({
  text,
  children,
  placement = "top start",
  offsetX = 0,
  offsetY = 0,
  withArrow,
  show = true,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [currentPlacement, setCurrentPlacement] =
    useState<Placement>(placement);

  const [direction] = currentPlacement.split(" ") as [
    "top" | "bottom" | "left" | "right",
    "start" | "center" | "end"
  ];

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setOpen(false), 150);
  };

  if (!show) return <>{children}</>;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex" }}
    >
      <div style={{ display: "inline-flex" }} ref={anchorRef}>
        {children}
      </div>

      <Dropdown
        anchorRef={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        offsetX={offsetX}
        offsetY={offsetY}
        onPlacementChange={setCurrentPlacement}
      >
        <div
          className={clsx(styles.tooltip, withArrow && styles.withArrow)}
          data-placement={direction}
        >
          {text}
        </div>
      </Dropdown>
    </div>
  );
};
