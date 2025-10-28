import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "big";
  icon?: ReactNode;
  children?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      icon,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    let buttonClass = styles.button;

    if (variant) buttonClass += ` ${styles[variant]}`;
    if (size) buttonClass += ` ${styles[size]}`;
    if (className) buttonClass += ` ${className}`;

    return (
      <button className={buttonClass} {...props} ref={ref}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  }
);

export default Button;
