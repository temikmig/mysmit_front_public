import styles from "./MoneyMovementsTag.module.css";
import { Tag } from "../../ui/Tag";
import { ArrowDownMinIcon, ArrowUpMinIcon } from "../../../assets/icons";

interface MoneyMovementsTagProps {
  text: string;
  type: "in" | "out";
  min?: boolean;
  fullwidth?: boolean;
}

export const MoneyMovementsTag = ({
  text,
  type,
  min = false,
  fullwidth = false,
}: MoneyMovementsTagProps) => {
  return (
    <Tag
      icon={type === "in" ? <ArrowDownMinIcon /> : <ArrowUpMinIcon />}
      text={text}
      className={styles[type]}
      min={min}
      fullwidth={fullwidth}
    />
  );
};
