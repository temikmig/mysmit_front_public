import styles from "./StockMovementsTypeTag.module.css";
import { Tag } from "../../ui/Tag";
import {
  STOCKMOVEMENTS_TYPE_LABELS,
  type StockMovementType,
} from "../../../common/types";
import { ArrowDownMinIcon, ArrowUpMinIcon } from "../../../assets/icons";

interface StockMovementsTypeTagProps {
  type: StockMovementType;
  min?: boolean;
  fullwidth?: boolean;
}

export const StockMovementsTypeTag = ({
  type,
  min = false,
  fullwidth = false,
}: StockMovementsTypeTagProps) => {
  return (
    <Tag
      icon={type === "IN" ? <ArrowDownMinIcon /> : <ArrowUpMinIcon />}
      text={STOCKMOVEMENTS_TYPE_LABELS[type]}
      className={styles[type]}
      min={min}
      fullwidth={fullwidth}
    />
  );
};
