import { Tag } from "../../ui/Tag";
import {
  CHECKLIST_STATUS_LABELS,
  type ChecklistStatus,
} from "../../../common/types";

import styles from "./ChecklistStatusTag.module.css";

interface ChecklistStatusTagProps {
  status: ChecklistStatus;
  min?: boolean;
  fullwidth?: boolean;
}

export const ChecklistStatusTag = ({
  status,
  min = false,
  fullwidth = false,
}: ChecklistStatusTagProps) => {
  return (
    <Tag
      text={CHECKLIST_STATUS_LABELS[status]}
      className={styles[status]}
      fullwidth={fullwidth}
      min={min}
    />
  );
};
