import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useState, useMemo } from "react";

import { PaginatedQueryParams, PaginatedResponse } from "@shared/api";
import { useDebounce } from "@shared/lib";

export type QueryHook<T, F = unknown> = (
  params: PaginatedQueryParams<T, F>,
) => {
  data?: PaginatedResponse<T>;
  isLoading: boolean;
  isFetching: boolean;
};

interface UseTableOptions<T, F> {
  query: QueryHook<T>;
  filters?: F;
}

export const useTable = <T, F = unknown>({
  query,
  filters,
}: UseTableOptions<T, F>) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 100,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const queryParams = useMemo(
    () => ({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      search: debouncedSearch || undefined,
      sortColumn: sortModel[0]?.field as keyof T | undefined,
      sortOrder: sortModel[0]?.sort ?? undefined,
      filters,
    }),
    [paginationModel, debouncedSearch, sortModel, filters],
  );

  const { data, isLoading, isFetching } = query(queryParams);

  return {
    rows: data?.data ?? [],
    total: data?.total ?? 0,

    isLoading,
    isFetching,

    paginationModel,
    setPaginationModel,

    sortModel,
    setSortModel,

    search,
    setSearch,
  };
};
