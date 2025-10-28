export const ExpensePeriodEnum = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  YEAR: "YEAR",
} as const;

export type ExpensePeriod =
  (typeof ExpensePeriodEnum)[keyof typeof ExpensePeriodEnum];

export const EXPENSE_PERIOD_LABELS: Record<ExpensePeriod, string> = {
  DAY: "День",
  WEEK: "Неделя",
  MONTH: "Месяц",
  YEAR: "Год",
};

export interface ManualExpenseItem {
  id: string;
  name: string;
  amount: number;
  amountPerMinute: number;
  note?: string | null;
  isActive: boolean;
}

export interface ManualExpensesBlock {
  items: ManualExpenseItem[];
  total: number;
  totalPerMinute: number;
}

export interface ProductExpenseItem {
  id: number;
  name: string;
  amount: number;
  amountPerMinute: number;
  unitStorage: string;
  quantity?: number;
  resourceQuantity?: number;
}

export interface ProductExpenseGroup {
  items: ProductExpenseItem[];
  total: number;
  totalPerMinute: number;
}

export type ProductExpenseType =
  | "BUSINESS_COST_MATERIAL"
  | "BUSINESS_COST_STORAGE"
  | "BUSINESS_COST_EQUIPMENT";

export type ProductExpensesBlock = Record<
  ProductExpenseType,
  ProductExpenseGroup
>;

export interface BusinessExpensesSummary {
  manualExpenses: ManualExpensesBlock;
  productExpenses: ProductExpensesBlock;
  totalAmount: number;
  totalAmountPerMinute: number;
}

export interface BusinessExpense {
  id: string;
  name: string;
  amount: number;
  period: ExpensePeriod;
  isActive: boolean;
  note: string;
  history: {
    id: string;
    amount: number;
    period: ExpensePeriod;
    note?: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AddBusinessExpenseInput {
  name: string;
  amount: number;
  period: ExpensePeriod;
  note?: string;
}

export interface EditBusinessExpenseInput {
  name?: string;
  amount?: number;
  period?: ExpensePeriod;
  isActive?: boolean;
  note?: string;
}
