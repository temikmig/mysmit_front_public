import { useState } from "react";
import styles from "./Toggle.module.css";
import clsx from "clsx";

interface ToggleProps {
  defaultChecked?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  mode?: "small" | "standard";
}

const Toggle = ({
  defaultChecked = false,
  label,
  disabled = false,
  onChange,
  mode = "standard",
}: ToggleProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    if (disabled) return;
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label
      className={clsx(
        styles.toggleCont,
        disabled && styles.disabled,
        mode === "small" && styles.small
      )}
    >
      <button
        type="button"
        className={clsx(
          styles.toggle,
          checked && styles.checked,
          disabled && styles.disabled
        )}
        onClick={handleClick}
        aria-pressed={checked}
        disabled={disabled}
      >
        <span className={styles.thumb} />
      </button>
      {label && (
        <span className={clsx("text_medium", styles.label)}>{label}</span>
      )}
    </label>
  );
};

export default Toggle;
