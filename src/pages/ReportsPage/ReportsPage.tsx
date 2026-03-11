import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ChecklistReportItem,
  useGetChecklistsReportQuery,
} from "@entities/checklist";
import { ChecklistsTable } from "@entities/checklist/ui/ChecklistsReportsTable/ChecklistsReportsTable";
import { useOpenChecklistCardModal } from "@features/checklist";
import { useDebounce } from "@shared/lib";
import { Loader, MonthYearPicker } from "@shared/ui";
import { PageHeader } from "@shared/ui/page-header";
import { TablePageBox } from "@widgets/table-page";

import { FiltersReport } from "./model";
import { ReportsFilters } from "./ReportsFilters";

export const ReportsPage = () => {
  const { checklistId } = useParams();

  const openChecklistCardModal = useOpenChecklistCardModal();

  const defaultPeriod = new Date();
  const monthStr = `${defaultPeriod.getFullYear()}-${(
    defaultPeriod.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  const [period, setPeriod] = useState(monthStr);
  const [filters, setFilters] = useState<FiltersReport>({});
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [sortColumn, setSortColumn] =
    useState<keyof ChecklistReportItem>("checklistDate");

  const { data: report, isLoading } = useGetChecklistsReportQuery({
    search: debouncedSearch,
    sortColumn,
    filters: { serviceId: filters.serviceId, month: period },
  });

  useEffect(() => {
    if (!checklistId) return;

    openChecklistCardModal(checklistId, false);
  }, []);

  if (isLoading) return <Loader />;

  if (!report) return null;

  return (
    <TablePageBox>
      <PageHeader
        pageTitle={`Отчёт${filters.serviceId ? ` по услуге "${filters.serviceName}"` : ``}`}
        actions={[]}
        searchValue={search}
        onSearchChange={setSearch}
        rightBlock={<MonthYearPicker value={period} onChange={setPeriod} />}
        hasFilters={
          filters &&
          Object.values(filters).some(
            (v) => v !== undefined && v !== null && v !== "",
          )
        }
        filters={
          <ReportsFilters
            value={filters}
            onApply={(data) => {
              setFilters(data);
            }}
          />
        }
      />

      <ChecklistsTable
        checklists={report.checklists}
        total={report.total}
        sums={report.sums}
        sortColumn={sortColumn}
        changeSortColumn={(sortColumn) => setSortColumn(sortColumn)}
      />
    </TablePageBox>
  );
};
