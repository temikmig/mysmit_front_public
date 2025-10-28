import clsx from "clsx";

import styles from "./Tag.module.css";
import { ReactNode } from "react";

interface TagProps {
  background?: string;
  className?: string;
  text: string;
  icon?: ReactNode;
  min?: boolean;
  fullwidth?: boolean;
}

export const Tag = ({
  background,
  className,
  icon,
  text,
  min = false,
  fullwidth = false,
}: TagProps) => {
  return (
    <div
      className={clsx(
        min ? "text_small" : "text_medium",
        styles.tagCont,
        className,
        min && styles.min,
        fullwidth && styles.fullwidth
      )}
      style={{ background: background }}
    >
      {icon}
      {text}
    </div>
  );
};
