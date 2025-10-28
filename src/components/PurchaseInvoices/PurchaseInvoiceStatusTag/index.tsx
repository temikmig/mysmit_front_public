import {
  PURCHASE_INVOICE_STATUS_LABELS,
  PurchaseInvoiceStatus,
} from "../../../common/types";

import styles from "./PurchaseInvoiceStatusTag.module.css";
import { Tag } from "../../ui/Tag";

interface PurchaseInvoiceStatusTagProps {
  status: PurchaseInvoiceStatus;
  min?: boolean;
  fullwidth?: boolean;
}

export const PurchaseInvoiceStatusTag = ({
  status,
  min = false,
  fullwidth = false,
}: PurchaseInvoiceStatusTagProps) => {
  return (
    <Tag
      text={PURCHASE_INVOICE_STATUS_LABELS[status]}
      className={styles[status]}
      min={min}
      fullwidth={fullwidth}
    />
  );
};
