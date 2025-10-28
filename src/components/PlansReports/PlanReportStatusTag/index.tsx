import {
  MONTHLYPLAN_STATUS_LABELS,
  MonthlyPlanStatus,
} from "../../../common/types";

import styles from "./PlanReportStatusTag.module.css";
import { Tag } from "../../ui/Tag";

interface PlanReportStatusTagProps {
  status: MonthlyPlanStatus;
  min?: boolean;
}

export const PlanReportStatusTag = ({
  status,
  min = false,
}: PlanReportStatusTagProps) => {
  return (
    <Tag
      text={MONTHLYPLAN_STATUS_LABELS[status]}
      className={styles[status]}
      min={min}
    />
  );
};
