import { Link, Typography } from "@mui/material";
import { FC } from "react";

import { ChecklistReportItem } from "@entities/checklist/model";
import { formatDateToText, formatMinutes, moneyFormat } from "@shared/lib";

import {
  ChecklistReportsTableRow,
  ChecklistReportsTableCell,
  ChecklistReportsValueCell,
  ChecklistReportsTotalValueCell,
} from "./ChecklistReportsTable.styled";

interface ChecklistsTableRowProps {
  checklist: ChecklistReportItem;
  openChecklist: (id: string, focus?: boolean) => void;
}

export const ChecklistsTableRowItem: FC<ChecklistsTableRowProps> = ({
  checklist,
  openChecklist,
}) => (
  <ChecklistReportsTableRow>
    <ChecklistReportsTableCell>
      <Typography>
        {formatDateToText(checklist.checklistDate, "date")}
      </Typography>
    </ChecklistReportsTableCell>
    <ChecklistReportsTableCell width={400}>
      <Link onClick={() => openChecklist(checklist.id, true)}>
        {checklist.serviceName}
      </Link>
    </ChecklistReportsTableCell>
    <ChecklistReportsValueCell>
      {formatMinutes(checklist.workTime)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.price)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.businessExpenses)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.directExpenses)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.toolEquipment)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.salary)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.financialReserve)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.businessGrowth)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.acquiring)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.loyalty)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.loyaltyWriteOff)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(checklist.acquisition)}
    </ChecklistReportsValueCell>
    <ChecklistReportsTotalValueCell>
      {moneyFormat(checklist.allCosts)}
    </ChecklistReportsTotalValueCell>
    <ChecklistReportsTotalValueCell>
      {moneyFormat(checklist.profit)}
    </ChecklistReportsTotalValueCell>
    <ChecklistReportsTotalValueCell>
      {moneyFormat(checklist.total)}
    </ChecklistReportsTotalValueCell>
  </ChecklistReportsTableRow>
);
