import { Table, TableBody } from "@mui/material";
import { FC } from "react";

import { ChecklistAnalytics } from "@entities/checklist/model";
import { moneyFormat } from "@shared/lib";

import {
  ChecklistAnalyticsTableContainer,
  ChecklistAnalyticsRow,
  ChecklistAnalyticsCell,
  ChecklistAnalyticsValueCell,
  ChecklistAnalyticsTotalRow,
} from "./ChecklistAnalyticsTable.styled";

interface ChecklistAnalyticsTableProps {
  checklistAnalytics: ChecklistAnalytics;
}

export const ChecklistAnalyticsTable: FC<ChecklistAnalyticsTableProps> = ({
  checklistAnalytics,
}) => {
  const analyticsFields: {
    label: string;
    value: number;
    show: boolean;
  }[] = [
    {
      value: checklistAnalytics.businessExpenses,
      label: "Бизнес-затраты",
      show: checklistAnalytics.businessExpenses > 0,
    },
    {
      value: checklistAnalytics.directExpenses,
      label: "Прямые затраты",
      show: checklistAnalytics.directExpenses > 0,
    },
    {
      value: checklistAnalytics.toolEquipment,
      label: "Инструменты и материалы",
      show: checklistAnalytics.toolEquipment > 0,
    },
    {
      value: checklistAnalytics.salary,
      label: "Зарплата",
      show: checklistAnalytics.salary > 0,
    },
    {
      value: checklistAnalytics.financialReserve,
      label: "Финансовый резерв",
      show: checklistAnalytics.financialReserve > 0,
    },
    {
      value: checklistAnalytics.businessGrowth,
      label: "Развитие бизнеса",
      show: checklistAnalytics.businessGrowth > 0,
    },
    {
      value: checklistAnalytics.acquiring,
      label: "Процент эквайринга",
      show: checklistAnalytics.acquiring > 0,
    },
    {
      value: checklistAnalytics.loyalty,
      label: "Карта лояльности",
      show: checklistAnalytics.loyalty > 0,
    },
    {
      value: checklistAnalytics.loyaltyWriteOff,
      label: "Списано с карты лояльности",
      show: checklistAnalytics.loyaltyWriteOff > 0,
    },
    {
      value: checklistAnalytics.acquisition,
      label: "Привлечение",
      show: checklistAnalytics.acquisition > 0,
    },
  ];

  const totalFields: {
    label: string;
    value: number;
  }[] = [
    { value: checklistAnalytics.allCosts, label: "Затраты" },
    { value: checklistAnalytics.profit, label: "Прибыль" },
    { value: checklistAnalytics.total, label: "Итого" },
  ];

  return (
    <ChecklistAnalyticsTableContainer>
      <Table size="small">
        <TableBody>
          {analyticsFields
            .filter((f) => f.show)
            .map(({ label, value }) => (
              <ChecklistAnalyticsRow key={label}>
                <ChecklistAnalyticsCell>{label}</ChecklistAnalyticsCell>
                <ChecklistAnalyticsValueCell>
                  {moneyFormat(value)}
                </ChecklistAnalyticsValueCell>
              </ChecklistAnalyticsRow>
            ))}

          {totalFields.map(({ label, value }) => (
            <ChecklistAnalyticsTotalRow key={label}>
              <ChecklistAnalyticsCell>{label}</ChecklistAnalyticsCell>
              <ChecklistAnalyticsValueCell>
                {moneyFormat(value)}
              </ChecklistAnalyticsValueCell>
            </ChecklistAnalyticsTotalRow>
          ))}
        </TableBody>
      </Table>
    </ChecklistAnalyticsTableContainer>
  );
};
