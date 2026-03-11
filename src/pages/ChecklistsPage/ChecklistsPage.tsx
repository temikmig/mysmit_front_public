import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  ChecklistListItem,
  useGetChecklistsListQuery,
} from "@entities/checklist";
import {
  useOpenChecklistCardModal,
  useOpenChecklistCreateModal,
} from "@features/checklist";
import { Loader, MonthYearPicker } from "@shared/ui";
import { TablePage } from "@widgets/table-page";

import {
  useChecklistActionsColumn,
  useChecklistColumns,
  useChecklistsPage,
} from "./model";

export const ChecklistsPage = () => {
  const { checklistId } = useParams();

  const createChecklist = useOpenChecklistCreateModal();
  const openChecklistCardModal = useOpenChecklistCardModal();

  const { columns } = useChecklistColumns();
  const { actionsColumn } = useChecklistActionsColumn();

  useEffect(() => {
    if (!checklistId) return;

    openChecklistCardModal(checklistId, false);
  }, []);

  const { tab, period, filters, setPeriod, handleTabChange, tabs, isLoading } =
    useChecklistsPage();

  if (isLoading) return <Loader />;

  return (
    <TablePage<ChecklistListItem>
      pageTitle="Чек-листы"
      tabs={tabs}
      activeTab={tab}
      onTabChange={handleTabChange}
      rightBlock={
        tab !== "all" && <MonthYearPicker value={period} onChange={setPeriod} />
      }
      query={useGetChecklistsListQuery}
      filtersState={filters}
      filtersButton={false}
      columns={[...columns, actionsColumn]}
      actions={[
        {
          icon: <Add />,
          title: "Создать чек-лист",
          onClick: createChecklist,
        },
      ]}
    />
  );
};
