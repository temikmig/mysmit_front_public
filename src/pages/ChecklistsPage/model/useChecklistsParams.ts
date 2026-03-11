import { useSearchParams } from "react-router-dom";

import { ChecklistsTab, ChecklistsTabEnum } from "./types";

export const useChecklistsParams = () => {
  const [params, setParams] = useSearchParams();

  const tab = (params.get("tab") as ChecklistsTab) ?? ChecklistsTabEnum.ALL;

  const page = Number(params.get("page") ?? 1);

  const search = params.get("search") ?? "";

  const period =
    params.get("period") ??
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

  const updateParams = (
    newParams: Record<string, string | number | undefined>,
  ) => {
    const next = new URLSearchParams(params);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setParams(next);
  };

  return {
    tab,
    page,
    search,
    period,
    params,
    setTab: (tab: ChecklistsTab) => updateParams({ tab, page: 1 }),

    setPage: (page: number) => updateParams({ page }),

    setSearch: (search: string) => updateParams({ search, page: 1 }),

    setPeriod: (period: string) => updateParams({ period }),
  };
};
