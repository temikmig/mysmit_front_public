import styles from "./MoneyMovementsTypeTag.module.css";
import { Tag } from "../../ui/Tag";
import {
  ArrowDownMinIcon,
  ArrowUpMinIcon,
  ShuffleIcon,
} from "../../../assets/icons";
import {
  MONEYMOVEMENT_TYPES_LABELS,
  MoneyMovementType,
  MoneyMovementTypeEnum,
} from "../../../common/types";

interface MoneyMovementsTypeTagProps {
  type: MoneyMovementType;
  min?: boolean;
  fullwidth?: boolean;
}

export const MoneyMovementsTypeTag = ({
  type,
  min = false,
  fullwidth = false,
}: MoneyMovementsTypeTagProps) => {
  return (
    <Tag
      icon={
        <>
          {type === MoneyMovementTypeEnum.INCOME && <ArrowDownMinIcon />}
          {type === MoneyMovementTypeEnum.TRANSFER && <ShuffleIcon />}
          {type === MoneyMovementTypeEnum.OUTCOME && <ArrowUpMinIcon />}
        </>
      }
      fullwidth={fullwidth}
      text={MONEYMOVEMENT_TYPES_LABELS[type]}
      className={styles[type]}
      min={min}
    />
  );
};
