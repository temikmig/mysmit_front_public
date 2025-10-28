import type { ReactNode } from "react";

import styles from "./ProductServiceTag.module.css";
import { Tag } from "../../ui/Tag";
import type { Service } from "../../../common/types";

interface ProductServiceTagsContProps {
  children: ReactNode;
}

export const ProductServiceTagsCont = ({
  children,
}: ProductServiceTagsContProps) => {
  return <div className={styles.serviceTagsCont}>{children}</div>;
};

interface ProductServiceTagProps {
  service: Service;
  min?: boolean;
}

export const ProductServiceTag = ({
  service,
  min = false,
}: ProductServiceTagProps) => {
  return <Tag text={service.name} background={service.color} min={min} />;
};
