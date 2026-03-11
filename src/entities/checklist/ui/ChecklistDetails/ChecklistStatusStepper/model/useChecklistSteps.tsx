import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useMemo } from "react";

import { Checklist } from "@entities/checklist";
import { formatDateToText } from "@shared/lib";

export interface ChecklistStep {
  label: string;
  subLabel?: string;
  icon: React.ReactNode;
}

export const useChecklistSteps = (checklist: Checklist): ChecklistStep[] => {
  return useMemo(() => {
    const steps: ChecklistStep[] = [];

    steps.push({
      label: "Создан",
      subLabel: `${checklist.createdBy.fullName} • ${formatDateToText(checklist.createdBy.date, "datetime string")}`,
      icon: <PersonAddAltIcon />,
    });

    if (checklist.status === "AWAITING_SENIOR") {
      steps.push({
        label: "На согласовании",
        icon: <FactCheckIcon />,
      });
    }

    if (checklist.rejectedBy) {
      steps.push({
        label: "Отклонен",
        subLabel: `${checklist.rejectedBy.fullName} • ${formatDateToText(checklist.rejectedBy.date, "datetime string")}`,
        icon: <FactCheckIcon />,
      });
    }

    if (checklist.confirmedBy) {
      steps.push({
        label: "Согласован",
        subLabel: `${checklist.confirmedBy.fullName} • ${formatDateToText(checklist.confirmedBy.date, "datetime string")}`,
        icon: <FactCheckIcon />,
      });
    }

    if (checklist.status === "AWAITING_MANAGER") {
      steps.push({
        label: "На подтверждении",
        icon: <AdminPanelSettingsIcon />,
      });
    }

    if (checklist.approvedBy) {
      steps.push({
        label: "Подтвержден",
        subLabel: checklist.approvedBy
          ? `${checklist.approvedBy.fullName} • ${formatDateToText(checklist.approvedBy.date, "datetime string")}`
          : "",
        icon: <AdminPanelSettingsIcon />,
      });
    }

    return steps;
  }, [checklist]);
};
