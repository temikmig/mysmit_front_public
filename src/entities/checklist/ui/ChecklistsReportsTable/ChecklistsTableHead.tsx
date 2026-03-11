import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/material";
import { FC } from "react";

import { ChecklistReportItem } from "@entities/checklist/model";

import {
  ChecklistReportsValueHeadCell,
  ChecklistReportsHeadRow,
  ChecklistReportsHeaderCell,
} from "./ChecklistReportsTable.styled";

interface ChecklistsTableHeadProps {
  sortColumn: keyof ChecklistReportItem;
  changeSortColumn?: (sortColumn: keyof ChecklistReportItem) => void;
}

export const ChecklistsTableHead: FC<ChecklistsTableHeadProps> = ({
  sortColumn,
  changeSortColumn,
}) => {
  const renderSortableHeader = (
    label: string,
    key: keyof ChecklistReportItem,
  ) => (
    <ChecklistReportsValueHeadCell onClick={() => changeSortColumn?.(key)}>
      <Box display="flex" gap={1}>
        {label}
        {sortColumn === key && <ArrowDownwardIcon fontSize="small" />}
      </Box>
    </ChecklistReportsValueHeadCell>
  );

  return (
    <ChecklistReportsHeadRow>
      {renderSortableHeader("Дата", "checklistDate")}
      <ChecklistReportsHeaderCell>Услуга</ChecklistReportsHeaderCell>
      {renderSortableHeader("Время", "workTime")}
      {renderSortableHeader("Стоимость", "price")}
      {renderSortableHeader("Бизнес-затраты", "businessExpenses")}
      {renderSortableHeader("Прямые затраты", "directExpenses")}
      {renderSortableHeader("Инструменты и оборудование", "toolEquipment")}
      {renderSortableHeader("Зарплата", "salary")}
      {renderSortableHeader("Фин. резерв", "financialReserve")}
      {renderSortableHeader("Развитие бизнеса", "businessGrowth")}
      {renderSortableHeader("Эквайринг", "acquiring")}
      {renderSortableHeader("Карта лояльности", "loyalty")}
      {renderSortableHeader("Списано с карты лояльности", "loyaltyWriteOff")}
      {renderSortableHeader("Привлечение", "acquisition")}
      {renderSortableHeader("Затраты", "allCosts")}
      {renderSortableHeader("Прибыль", "profit")}
      {renderSortableHeader("Итого", "total")}
    </ChecklistReportsHeadRow>
  );
};
