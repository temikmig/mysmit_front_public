import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
  useId,
  forwardRef,
  useEffect,
} from "react";
import clsx from "clsx";
import styles from "./Input.module.css";
import { Tooltip } from "../Tooltip";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  width?: number;
  inputComponent?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      leftIcon,
      rightIcon,
      type = "text",
      error = false,
      errorMessage,
      helperText,
      disabled,
      width,
      inputComponent,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(
      type === "number" && value !== undefined
        ? formatNumberDisplay(String(value))
        : value ?? ""
    );

    const inputId = useId();

    function formatNumberDisplay(val: string) {
      if (!val) return "";

      val = val.replace(".", ",");

      const [intPart, decimalPart] = val.split(",");
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      return decimalPart !== undefined
        ? `${formattedInt},${decimalPart}`
        : formattedInt;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      if (type === "number") {
        val = val.replace(/[^\d,]/g, "");

        const commaIndex = val.indexOf(",");
        if (commaIndex !== -1) {
          val =
            val.slice(0, commaIndex + 1) +
            val.slice(commaIndex + 1).replace(/,/g, "");
        }

        setDisplayValue(formatNumberDisplay(val));

        const numericValue = val
          ? Number(val.replace(/\s/g, "").replace(",", "."))
          : 0;

        if (props.name && typeof onChange === "function") {
          onChange({
            target: { name: props.name, value: numericValue },
          } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      } else {
        setDisplayValue(val);
        onChange?.(e);
      }
    };

    useEffect(() => {
      if (type === "number") {
        setDisplayValue(
          value !== undefined ? formatNumberDisplay(String(value)) : ""
        );
      } else {
        setDisplayValue(value ?? "");
      }
    }, [value, type]);

    return (
      <div className={clsx(styles.container, className)} style={{ width }}>
        {label && (
          <Tooltip
            text={errorMessage || ""}
            placement="right center"
            show={Boolean(errorMessage)}
            withArrow
            offsetX={8}
          >
            <label
              htmlFor={inputId}
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
          onClick={props.onClick}
          ref={ref}
        >
          {leftIcon && (
            <span className={clsx(styles.icon, styles.left)}>{leftIcon}</span>
          )}

          {inputComponent ? (
            inputComponent
          ) : (
            <input
              id={inputId}
              className={styles.input}
              type={type === "password" ? "password" : "text"}
              disabled={disabled}
              autoComplete="off"
              ref={ref}
              value={displayValue}
              onChange={handleChange}
              {...props}
            />
          )}

          {rightIcon && (
            <span className={clsx(styles.icon, styles.right)}>{rightIcon}</span>
          )}
        </div>

        {helperText && (
          <p className={clsx("text_small", styles.helperText)}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
