import { PRODUCT_TYPES_LABELS, type ProductType } from "../../../common/types";

import styles from "./ProductTypeTag.module.css";
import { Tag } from "../../ui/Tag";

interface ProductTypeTagProps {
  type: ProductType;
  min?: boolean;
}

export const ProductTypeTag = ({ type, min = false }: ProductTypeTagProps) => {
  return (
    <Tag text={PRODUCT_TYPES_LABELS[type]} className={styles[type]} min={min} />
  );
};
