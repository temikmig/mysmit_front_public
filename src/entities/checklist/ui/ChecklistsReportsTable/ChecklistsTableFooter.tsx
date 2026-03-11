import { FC } from "react";

import { ChecklistReportSums } from "@entities/checklist/model";
import { formatMinutes, moneyFormat, pluralForm } from "@shared/lib";

import {
  ChecklistReportsBottomRow,
  ChecklistReportsValueCell,
  ChecklistReportsTotalValueCell,
  ChecklistReportsTableCell,
} from "./ChecklistReportsTable.styled";

interface ChecklistsTableFooterProps {
  total: number;
  sums: ChecklistReportSums;
}

export const ChecklistsTableFooter: FC<ChecklistsTableFooterProps> = ({
  total,
  sums,
}) => (
  <ChecklistReportsBottomRow>
    <ChecklistReportsTableCell colSpan={2}>
      Найдено{" "}
      {`${total} ${pluralForm(total, ["чек-лист", "чек-листа", "чек-листов"])}`}
    </ChecklistReportsTableCell>
    <ChecklistReportsValueCell>
      {formatMinutes(sums.workTime)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.price)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.businessExpenses)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.directExpenses)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.toolEquipment)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.salary)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.financialReserve)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.businessGrowth)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.acquiring)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.loyalty)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.loyaltyWriteOff)}
    </ChecklistReportsValueCell>
    <ChecklistReportsValueCell>
      {moneyFormat(sums.acquisition)}
    </ChecklistReportsValueCell>
    <ChecklistReportsTotalValueCell>
      {moneyFormat(sums.allCosts)}
    </ChecklistReportsTotalValueCell>
    <ChecklistReportsTotalValueCell>
      {moneyFormat(sums.profit)}
    </ChecklistReportsTotalValueCell>
    <ChecklistReportsTotalValueCell>
      {moneyFormat(sums.total)}
    </ChecklistReportsTotalValueCell>
  </ChecklistReportsBottomRow>
);
