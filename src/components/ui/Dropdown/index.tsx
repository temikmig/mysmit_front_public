import {
  useState,
  useRef,
  useEffect,
  type RefObject,
  type ReactNode,
} from "react";
import styles from "./Dropdown.module.css";
import clsx from "clsx";
import { createPortal } from "react-dom";

export type Placement =
  | "top start"
  | "top center"
  | "top end"
  | "bottom start"
  | "bottom center"
  | "bottom end"
  | "left start"
  | "left center"
  | "left end"
  | "right start"
  | "right center"
  | "right end"
  | "center";

interface DropdownProps {
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  offsetX?: number;
  offsetY?: number;
  fullWidth?: boolean;
  placement?: Placement;
  onPlacementChange?: (placement: Placement) => void;
  withShadow?: boolean;
  className?: string;
  modal?: boolean;
  overlay?: boolean;
  overlayClose?: boolean;
  mode?: "fixed" | "absolute" | "relative";
  width?: string;
}

export const Dropdown = ({
  anchorRef,
  children,
  open,
  onClose,
  offsetX = 0,
  offsetY = 0,
  fullWidth = false,
  placement = "bottom start",
  onPlacementChange,
  withShadow = false,
  className,
  overlay = false,
  modal = false,
  overlayClose = true,
  mode = "fixed",
  width,
}: DropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPlacement, setCurrentPlacement] =
    useState<Placement>(placement);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlay || !overlayRef.current) return;

    if (open) {
      setIsMounted(true);

      requestAnimationFrame(() => {
        if (overlayRef.current) {
          overlayRef.current.style.opacity = "1";
        }
      });
    } else if (isMounted) {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = "0";
      }
      const timeout = setTimeout(() => setIsMounted(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [open, overlay, isMounted]);

  useEffect(() => {
    if (open) {
      setIsMounted(true);

      const frame = requestAnimationFrame(() => {
        updatePosition();

        if (dropdownRef.current) {
          dropdownRef.current.style.transition =
            "opacity 0.25s ease, transform 0.25s ease";
          dropdownRef.current.style.opacity = "1";
          dropdownRef.current.style.transform = !modal ? "translate(0,0)" : "";
        }
      });

      return () => cancelAnimationFrame(frame);
    } else if (isMounted) {
      if (dropdownRef.current) {
        const [direction] = currentPlacement.split(" ");
        const offset =
          direction === "bottom"
            ? -10
            : direction === "top"
            ? 10
            : direction === "left"
            ? 10
            : -10;

        const transform =
          placement === "center"
            ? `scale(0.95)`
            : direction === "left" || direction === "right"
            ? `translateX(${offset}px)`
            : `translateY(${offset}px)`;

        dropdownRef.current.style.opacity = "0";
        dropdownRef.current.style.transform = transform;
      }

      animationRef.current = requestAnimationFrame(() => {
        setTimeout(() => setIsMounted(false), 150);
      });
    }
  }, [open, isMounted, currentPlacement]);

  const updatePosition = () => {
    if (!dropdownRef.current || !anchorRef.current) return;

    const dropdown = dropdownRef.current;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = dropdown.getBoundingClientRect();

    const [direction, align] = placement.split(" ") as [
      "top" | "bottom" | "left" | "right",
      "start" | "center" | "end"
    ];

    let top = 0;
    let left = 0;
    let newDirection: typeof direction = direction;

    if (direction === "bottom") {
      top = anchorRect.bottom + offsetY;
      left =
        align === "start"
          ? anchorRect.left + offsetX
          : align === "center"
          ? anchorRect.left + (anchorRect.width - menuRect.width) / 2 + offsetX
          : anchorRect.right - menuRect.width + offsetX;

      if (top + menuRect.height > window.innerHeight) {
        newDirection = "top";
        top = anchorRect.top - menuRect.height - offsetY;
      }
    }

    if (direction === "top") {
      top = anchorRect.top - menuRect.height - offsetY;
      left =
        align === "start"
          ? anchorRect.left + offsetX
          : align === "center"
          ? anchorRect.left + (anchorRect.width - menuRect.width) / 2 + offsetX
          : anchorRect.right - menuRect.width + offsetX;

      if (top < 0) {
        newDirection = "bottom";
        top = anchorRect.bottom + offsetY;
      }
    }

    if (direction === "left") {
      left = anchorRect.left - menuRect.width - offsetX;
      top =
        align === "start"
          ? anchorRect.top + offsetY
          : align === "center"
          ? anchorRect.top + (anchorRect.height - menuRect.height) / 2 + offsetY
          : anchorRect.bottom - menuRect.height + offsetY;

      if (left < 0) {
        newDirection = "right";
        left = anchorRect.right + offsetX;
      }
    }

    if (direction === "right") {
      left = anchorRect.right + offsetX;
      top =
        align === "start"
          ? anchorRect.top + offsetY
          : align === "center"
          ? anchorRect.top + (anchorRect.height - menuRect.height) / 2 + offsetY
          : anchorRect.bottom - menuRect.height + offsetY;

      if (left + menuRect.width > window.innerWidth) {
        newDirection = "left";
        left = anchorRect.left - menuRect.width - offsetX;
      }
    }

    if (left < 10) left = 10;
    if (top < 10) top = 10;

    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;

    if (fullWidth) dropdown.style.width = `${anchorRect.width}px`;

    const newPlacement = `${newDirection} ${align}` as Placement;

    setCurrentPlacement(`${newDirection} ${align}` as Placement);
    onPlacementChange?.(newPlacement);
  };

  useEffect(() => {
    if (!isMounted) return;

    updatePosition();
    const handleUpdate = () => updatePosition();

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);
    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [isMounted, anchorRef, fullWidth, placement]);

  useEffect(() => {
    if (!isMounted) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      )
        onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted, onClose, anchorRef]);

  if (!isMounted) return null;

  const [direction] = currentPlacement.split(" ");
  const initialTransform =
    placement === "center"
      ? "scale(0.95)"
      : direction === "bottom"
      ? "translateY(-10px)"
      : direction === "top"
      ? "translateY(10px)"
      : direction === "left"
      ? "translateX(10px)"
      : "translateX(-10px)";

  const content = (
    <div
      ref={dropdownRef}
      className={clsx(styles.dropdownCont, withShadow && "shadow-container")}
      style={{
        position: mode,
        zIndex: 1000,
        opacity: 0,
        transform: initialTransform,
        width: width,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={clsx(
          styles.dropdownWrapper,
          className,
          modal && styles.modalWrapper
        )}
      >
        {children}
      </div>
    </div>
  );

  if (overlay && isMounted)
    return (
      <div
        className={clsx(styles.overlayCont)}
        ref={overlayRef}
        onClick={() => overlayClose && onClose()}
      >
        {content}
      </div>
    );

  return createPortal(content, document.body);
  return;
};
