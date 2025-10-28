export interface PlanData {
  year: number;
  month: number;
}

export interface AddToPiggyBanksInput {
  year: number;
  month: number;
  totalAmount: number;
  sourceFromId?: string;
  comment?: string;
}

export interface EditPiggyBankInput {
  piggyBankId: string;
  name?: string;
  plannedAmount?: number;
  description?: string;
}

export const PiggyBankTypeEnum = {
  BUSINESS_COST: "BUSINESS_COST",
  SALARY: "SALARY",
  PROFIT: "PROFIT",
  CUSTOM: "CUSTOM",
} as const;

export type PiggyBankType =
  (typeof PiggyBankTypeEnum)[keyof typeof PiggyBankTypeEnum];

export interface PiggyBank {
  id: string;
  name: string;
  type: PiggyBankType;
  priority: number;
  plannedAmount: number;
  actualAmount: number;
  isDistributed: boolean;
}

export interface MonthlyPlan {
  id: string;
  year: number;
  month: number;
  isActive: boolean;
  closedAt: string;
  totalActualAmount: number;
  piggyBanks: PiggyBank[];
  total: {
    planned: number;
    actual: number;
  };
}

export const MonthlyPlanStatusEnum = {
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED",
  UNKNOWN: "UNKNOWN",
} as const;

export type MonthlyPlanStatus =
  (typeof MonthlyPlanStatusEnum)[keyof typeof MonthlyPlanStatusEnum];

export const MONTHLYPLAN_STATUS_LABELS: Record<MonthlyPlanStatus, string> = {
  ACTIVE: "Активный",
  CLOSED: "Закрытый",
  UNKNOWN: "Нет информации",
};
