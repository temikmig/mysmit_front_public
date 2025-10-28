import { type InputHTMLAttributes, useId } from "react";
import styles from "./Radio.module.css";
import clsx from "clsx";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Radio = ({
  label,
  error,
  errorMessage,
  disabled,
  ...props
}: RadioProps) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        className={clsx(styles.wrapper, disabled && styles.disabled)}
      >
        <input
          id={id}
          type="radio"
          className={styles.input}
          disabled={disabled}
          {...props}
        />
        <span className={clsx(styles.circle, error && styles.error)} />
        {label && (
          <span className={clsx("text_medium", styles.label)}>{label}</span>
        )}
      </label>

      {error && errorMessage && (
        <p className={clsx("text_small", styles.errorMessage)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
