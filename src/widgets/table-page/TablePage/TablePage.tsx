import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";
import { ReactNode } from "react";

import { QueryHook, useTable } from "@shared/lib";
import { PageHeader } from "@shared/ui/page-header";
import {
  PageHeaderActionItem,
  PageHeaderTabItem,
} from "@shared/ui/page-header/model";

import { TablePageBox } from "./TablePage.styled";

type TablePageProps<T, F = unknown> = {
  pageTitle: string;
  query: QueryHook<T>;
  columns: GridColDef[];
  columnGroupingModel?: GridColumnGroupingModel;
  actions?: PageHeaderActionItem[];
  tabs?: PageHeaderTabItem[];
  activeTab?: string | number;
  onTabChange?: (value: string) => void;
  filters?: ReactNode;
  filtersState?: F;
  rightBlock?: ReactNode;
  filtersButton?: boolean;
};

export const TablePage = <T, F = unknown>({
  pageTitle,
  query,
  columns,
  columnGroupingModel,
  actions,
  tabs,
  activeTab,
  onTabChange,
  filters,
  filtersState,
  rightBlock,
  filtersButton,
}: TablePageProps<T, F>) => {
  const {
    rows,
    total,
    isLoading,
    isFetching,
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
    search,
    setSearch,
  } = useTable<T, F>({ query, filters: filtersState });

  return (
    <TablePageBox>
      <PageHeader
        pageTitle={pageTitle}
        actions={actions}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        searchValue={search}
        onSearchChange={setSearch}
        filters={filters}
        hasFilters={
          filtersState &&
          Object.values(filtersState).some(
            (v) => v !== undefined && v !== null && v !== "",
          )
        }
        filtersButton={filtersButton}
        rightBlock={rightBlock}
      />
      <DataGrid
        columns={columns}
        columnGroupingModel={columnGroupingModel}
        rows={rows}
        rowCount={total}
        loading={isLoading || isFetching}
        paginationMode="server"
        sortingMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </TablePageBox>
  );
};
