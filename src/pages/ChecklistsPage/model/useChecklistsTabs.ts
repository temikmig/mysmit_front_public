import { useMemo } from "react";

import { useGetChecklistsStatsQuery } from "@entities/checklist";
import { useAuth } from "@features/auth";

import { ChecklistsTabEnum, ChecklistsTab } from "./types";

interface UseChecklistsTabsProps {
  period: string;
}

export const useChecklistsTabs = ({ period }: UseChecklistsTabsProps) => {
  const { data, isLoading } = useGetChecklistsStatsQuery({ month: period });
  const { isAdmin } = useAuth();

  const tabs = useMemo(() => {
    const awaitingSenior = data?.awaitingSenior ?? 0;
    const awaitingManager = data?.awaitingManager ?? 0;
    const approved = data?.approved ?? 0;
    const total = data?.total ?? 0;

    const resultTabs = [
      {
        label: "На согласовании",
        value: ChecklistsTabEnum.AWAITING_SENIOR,
        badgeContent: awaitingSenior,
        importantBadge: true,
      },
      {
        label: "На подтверждении",
        value: ChecklistsTabEnum.AWAITING_MANAGER,
        badgeContent: awaitingManager,
        importantBadge: true,
      },
      {
        label: "Подтвержденные",
        value: ChecklistsTabEnum.APPROVED,
        badgeContent: approved,
      },
      {
        label: "Все чек-листы",
        value: ChecklistsTabEnum.ALL,
        badgeContent: total,
      },
    ];

    if (isAdmin)
      return resultTabs.filter(
        (t) => t.value !== ChecklistsTabEnum.AWAITING_SENIOR,
      );

    return resultTabs;
  }, [data, isAdmin]);

  const defaultTab = useMemo<ChecklistsTab>(() => {
    if (isAdmin) {
      if (
        tabs.find(
          (t) =>
            t.value === ChecklistsTabEnum.AWAITING_MANAGER &&
            t.badgeContent > 0,
        )
      )
        return ChecklistsTabEnum.AWAITING_MANAGER;
      if (
        tabs.find(
          (t) => t.value === ChecklistsTabEnum.APPROVED && t.badgeContent > 0,
        )
      )
        return ChecklistsTabEnum.APPROVED;
      return ChecklistsTabEnum.ALL;
    }

    if (
      tabs.find(
        (t) =>
          t.value === ChecklistsTabEnum.AWAITING_MANAGER && t.badgeContent > 0,
      )
    )
      return ChecklistsTabEnum.AWAITING_MANAGER;
    if (
      tabs.find(
        (t) =>
          t.value === ChecklistsTabEnum.AWAITING_SENIOR && t.badgeContent > 0,
      )
    )
      return ChecklistsTabEnum.AWAITING_SENIOR;
    if (
      tabs.find(
        (t) => t.value === ChecklistsTabEnum.APPROVED && t.badgeContent > 0,
      )
    )
      return ChecklistsTabEnum.APPROVED;
    return ChecklistsTabEnum.ALL;
  }, [tabs, isAdmin]);

  return { tabs, isLoading, defaultTab };
};
