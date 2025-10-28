import React, { type FC, useRef, useState } from "react";
import clsx from "clsx";
import { Dropdown } from "../Dropdown";
import styles from "./MultiSelect.module.css";
import { AngleDownMinIcon, CheckIcon } from "../../../assets/icons";
import { Tooltip } from "../Tooltip";

interface MultiSelectOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: "default" | "blue" | "red";
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  values?: Array<string | number>;
  onChange?: (values: Array<string | number>) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  options,
  values = [],
  onChange,
  label,
  placeholder = "Выберите...",
  error,
  errorMessage,
  helperText,
  disabled,
  className,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(values);

  const toggleOption = (value: string | number) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const displayText =
    selected.length > 0
      ? options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(", ")
      : placeholder;

  return (
    <div className={(styles.container, className)}>
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
        <span className={clsx(styles.value)}>{displayText}</span>

        <AngleDownMinIcon
          className={clsx(styles.iconRight, open && styles.open)}
        />
      </div>

      <Dropdown
        anchorRef={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
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
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(opt.value);
              }}
            >
              {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
              <span>{opt.label}</span>
              {selected.includes(opt.value) && (
                <CheckIcon className={styles.checkIcon} />
              )}
            </div>
          ))}
        </div>
      </Dropdown>

      {helperText ? (
        <p className={clsx("text_small", styles.helperText)}>{helperText}</p>
      ) : null}
    </div>
  );
};
