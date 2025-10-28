import clsx from "clsx";
import styles from "./Range.module.css";

interface RangeProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const Range = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  className,
}: RangeProps) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
      className={clsx(styles.slider, className)}
    />
  );
};
