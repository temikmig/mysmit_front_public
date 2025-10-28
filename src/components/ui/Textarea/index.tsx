import { type TextareaHTMLAttributes, useId, type ReactNode } from "react";
import styles from "./Textarea.module.css";
import clsx from "clsx";
import { Tooltip } from "../Tooltip";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  width?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Textarea = ({
  className = "",
  label,
  error = false,
  errorMessage,
  helperText,
  disabled,
  width,
  leftIcon,
  rightIcon,
  ...props
}: TextareaProps) => {
  const textareaId = useId();

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
          <label
            htmlFor={textareaId}
            className={clsx(
              "text_medium",
              styles.label,
              disabled && styles.labelDisabled,
              error && styles.labelError
            )}
          >
            {label}
          </label>
        </Tooltip>
      )}

      <div
        className={clsx(
          styles.wrapper,
          error && styles.error,
          disabled && styles.disabled
        )}
      >
        {leftIcon && (
          <span className={clsx(styles.icon, styles.left)}>{leftIcon}</span>
        )}

        <textarea
          id={textareaId}
          className={styles.textarea}
          disabled={disabled}
          autoComplete="off"
          {...props}
        />

        {rightIcon && (
          <span className={clsx(styles.icon, styles.right)}>{rightIcon}</span>
        )}
      </div>

      {helperText ? (
        <p className={clsx("text_small", styles.helperText)}>{helperText}</p>
      ) : null}
    </div>
  );
};
