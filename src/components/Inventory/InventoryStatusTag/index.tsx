import {
  INVENTORY_STATUS_LABELS,
  InventoryStatus,
} from "../../../common/types";

import styles from "./InventoryStatusTag.module.css";
import { Tag } from "../../ui/Tag";

interface InventoryStatusTagProps {
  status: InventoryStatus;
  min?: boolean;
  fullwidth?: boolean;
}

export const InventoryStatusTag = ({
  status,
  min = false,
  fullwidth = false,
}: InventoryStatusTagProps) => {
  return (
    <Tag
      text={INVENTORY_STATUS_LABELS[status]}
      className={styles[status]}
      min={min}
      fullwidth={fullwidth}
    />
  );
};
