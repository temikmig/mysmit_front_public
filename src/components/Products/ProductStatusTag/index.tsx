import { PRODUCT_STATUS_LABELS, ProductStatus } from "../../../common/types";

import styles from "./ProductStatusTag.module.css";
import { Tag } from "../../ui/Tag";

interface ProductStatusTagProps {
  status: ProductStatus;
  min?: boolean;
}

export const ProductStatusTag = ({
  status,
  min = false,
}: ProductStatusTagProps) => {
  return (
    <Tag
      text={PRODUCT_STATUS_LABELS[status]}
      className={styles[status]}
      min={min}
    />
  );
};
