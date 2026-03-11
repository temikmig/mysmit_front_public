import { useState, useEffect, useMemo } from "react";

import { useGetChecklistsStatsQuery } from "@entities/checklist";
import { useAuth } from "@features/auth";

import { ChecklistsTab, ChecklistsTabEnum, FiltersChecklists } from "./types";

export const useChecklistsPage = () => {
  const { isAdmin } = useAuth();

  const defaultPeriod = new Date();
  const monthStr = `${defaultPeriod.getFullYear()}-${(
    defaultPeriod.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  const [period, setPeriod] = useState(monthStr);

  const { data: stats, isLoading: statsLoading } = useGetChecklistsStatsQuery({
    month: period,
  });

  const tabs = useMemo(() => {
    if (!stats) return [];

    const resultTabs = [
      {
        label: "Отклонены",
        value: ChecklistsTabEnum.REJECTED,
        badgeContent: stats.rejected,
      },
      {
        label: "На согласовании",
        value: ChecklistsTabEnum.AWAITING_SENIOR,
        badgeContent: stats.awaitingSenior,
      },
      {
        label: "На подтверждении",
        value: ChecklistsTabEnum.AWAITING_MANAGER,
        badgeContent: stats.awaitingManager,
      },
      {
        label: "Подтвержденные",
        value: ChecklistsTabEnum.APPROVED,
        badgeContent: stats.approved,
      },
      {
        label: "Все чек-листы",
        value: ChecklistsTabEnum.ALL,
        badgeContent: stats.total,
      },
    ];

    const filtered = isAdmin
      ? resultTabs.filter(
          (t) =>
            (t.value !== ChecklistsTabEnum.AWAITING_SENIOR &&
              t.badgeContent > 0) ||
            t.value === ChecklistsTabEnum.ALL,
        )
      : resultTabs.filter((t) =>
          t.value !== ChecklistsTabEnum.ALL ? t.badgeContent > 0 : true,
        );

    return filtered.length ? filtered : resultTabs;
  }, [stats, isAdmin]);

  const defaultTab = useMemo<ChecklistsTab>(() => {
    if (!stats) return ChecklistsTabEnum.ALL;
    if (isAdmin) {
      return stats.awaitingManager > 0
        ? ChecklistsTabEnum.AWAITING_MANAGER
        : stats.approved > 0
          ? ChecklistsTabEnum.APPROVED
          : ChecklistsTabEnum.ALL;
    } else {
      if (stats.rejected > 0) return ChecklistsTabEnum.REJECTED;
      if (stats.awaitingSenior > 0) return ChecklistsTabEnum.AWAITING_SENIOR;
      if (stats.awaitingManager > 0) return ChecklistsTabEnum.AWAITING_MANAGER;
      if (stats.approved > 0) return ChecklistsTabEnum.APPROVED;
      return ChecklistsTabEnum.ALL;
    }
  }, [stats, isAdmin]);

  const [tab, setTab] = useState<ChecklistsTab | null>(null);
  const [filters, setFilters] = useState<FiltersChecklists | null>(null);

  useEffect(() => {
    if (!stats) return;
    setTab(defaultTab);
    setFilters({
      status: defaultTab === ChecklistsTabEnum.ALL ? undefined : defaultTab,
      month: period,
    });
  }, [stats, defaultTab, period]);

  const handleTabChange = (newTab: string) => {
    const tabEnum = newTab as ChecklistsTab;
    setTab(tabEnum);
    setFilters({
      status: tabEnum === ChecklistsTabEnum.ALL ? undefined : tabEnum,
      month: tabEnum === ChecklistsTabEnum.ALL ? undefined : period,
    });
  };

  useEffect(() => {
    if (!filters) return;
    setFilters((prev) => ({ ...prev!, month: period }));
  }, [period]);

  return {
    tab: tab ?? ChecklistsTabEnum.ALL,
    period,
    setPeriod,
    filters,
    handleTabChange,
    tabs,
    isLoading: statsLoading || !filters,
  };
};
