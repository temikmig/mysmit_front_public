import { type ReactNode, useRef, useState } from "react";
import clsx from "clsx";
import { Dropdown } from "../Dropdown";
import styles from "./Select.module.css";
import { AngleDownMinIcon } from "../../../assets/icons";
import { Tooltip } from "../Tooltip";

interface SelectOption<T> {
  value: string | number;
  label: string;
  data?: T;
  display?: string;
  icon?: ReactNode;
  color?: "default" | "blue" | "red";
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  value?: string | number;
  onChange: (
    value: string | number,
    obj?: SelectOption<T> | SelectOption<T>[]
  ) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  actionLabel?: string;
  actionLabelIcon?: ReactNode;
  onAction?: () => void;
  width?: number;
  fullWidth?: boolean;
}

export const Select = <T,>({
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  label,
  error,
  errorMessage,
  helperText,
  disabled,
  className,
  actionLabel,
  actionLabelIcon,
  onAction,
  width,
  fullWidth = true,
}: SelectProps<T>) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={clsx(styles.container, className)} style={{ width: width }}>
      {label && (
        <Tooltip
          text={errorMessage || ""}
          placement="right center"
          show={Boolean(errorMessage)}
          withArrow
          offsetX={8}
        >
          <p
            className={clsx(
              "text_medium",
              styles.label,
              error && styles.labelError
            )}
          >
            {label}
          </p>
        </Tooltip>
      )}

      <div
        ref={anchorRef}
        className={clsx(
          styles.wrapper,
          error && styles.error,
          disabled && styles.disabled
        )}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span className={clsx(styles.value)}>
          {selectedOption?.display || selectedOption?.label || placeholder}
        </span>

        <AngleDownMinIcon
          className={clsx(styles.iconRight, open && styles.open)}
        />
      </div>

      <Dropdown
        anchorRef={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={fullWidth}
        withShadow
        offsetY={8}
      >
        <div className={styles.selectCont}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={clsx(styles.selectItem, {
                [styles.blue]: opt.color === "blue",
                [styles.red]: opt.color === "red",
              })}
              onClick={() => {
                onChange(opt.value, opt);
                setOpen(false);
              }}
            >
              {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
              <span>{opt.label}</span>
            </div>
          ))}

          {actionLabel && onAction && (
            <div
              className={clsx(styles.selectItem, styles.actionItem)}
              onClick={onAction}
            >
              <span className={styles.icon}>{actionLabelIcon}</span>
              <span>{actionLabel}</span>
            </div>
          )}
        </div>
      </Dropdown>

      {helperText ? (
        <p className={clsx("text_small", styles.helperText)}>{helperText}</p>
      ) : null}
    </div>
  );
};
