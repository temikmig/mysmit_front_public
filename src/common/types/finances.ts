import { Checklist } from "./checklists";
import { PurchaseInvoice } from "./purchaseInvoice";

export const MoneyMovementTypeEnum = {
  INCOME: "INCOME",
  OUTCOME: "OUTCOME",
  TRANSFER: "TRANSFER",
} as const;

export type MoneyMovementType =
  (typeof MoneyMovementTypeEnum)[keyof typeof MoneyMovementTypeEnum];

export const MONEYMOVEMENT_TYPES_LABELS: Record<MoneyMovementType, string> = {
  INCOME: "Поступление",
  OUTCOME: "Списание",
  TRANSFER: "Перемещение",
};

export const MoneySourceTypeEnum = {
  CASH: "CASH",
  BANK_ACCOUNT: "BANK_ACCOUNT",
} as const;

export type MoneySourceType =
  (typeof MoneySourceTypeEnum)[keyof typeof MoneySourceTypeEnum];

export interface MoneySource {
  id: string;
  name: string;
  type: MoneySourceType;
  balance: number;
}

export interface Fund {
  id: string;
  name: string;
  balance: number;
  parentId?: string;
  parent?: Fund;
  type: FundType;
  children: Fund[];
}

export interface MoneyMovement {
  id: string;
  type: MoneyMovementType;
  amount: number;
  comment?: string;
  createdAt: string;
  sourceFrom?: MoneySource | null;
  sourceFromId?: string;
  sourceTo?: MoneySource | null;
  sourceToId?: string;
  fundFrom?: Fund | null;
  fundFromId?: string;
  fundTo?: Fund | null;
  fundToId?: string;
  checklistId?: string | null;
  checklist?: Checklist;
  purchaseInvoiceId?: string | null;
  purchaseInvoice?: PurchaseInvoice;
}

export interface BalanceResponse {
  totalBalance: number;
  totalSourcesBalance: number;
  totalFundsBalance: number;
  unallocatedBalance: number;
  sources: MoneySource[];
  funds: Fund[];
}

export const FundTypeEnum = {
  CUSTOM: "CUSTOM",
  SYSTEM_FUND: "SYSTEM_FUND",

  BUSINESS_FUND: "BUSINESS_FUND",
  BUSINESS_MATERIAL: "BUSINESS_MATERIAL",
  BUSINESS_STORAGE: "BUSINESS_STORAGE",
  BUSINESS_EQUIPMENT: "BUSINESS_EQUIPMENT",

  MATERIAL_FUND: "MATERIAL_FUND",
  CONSUMABLE_FUND: "CONSUMABLE_FUND",
  CHEMICAL_FUND: "CHEMICAL_FUND",
  TOOL_FUND: "TOOL_FUND",
  EQUIPMENT_FUND: "EQUIPMENT_FUND",

  WRAPPING_MATERIAL_FUND: "WRAPPING_MATERIAL_FUND",
  WRAPPING_CONSUMABLE_FUND: "WRAPPING_CONSUMABLE_FUND",
  WRAPPING_CHEMICAL_FUND: "WRAPPING_CHEMICAL_FUND",
  WRAPPING_TOOL_FUND: "WRAPPING_TOOL_FUND",
  WRAPPING_EQUIPMENT_FUND: "WRAPPING_EQUIPMENT_FUND",

  TINING_MATERIAL_FUND: "TINING_MATERIAL_FUND",
  TINING_CONSUMABLE_FUND: "TINING_CONSUMABLE_FUND",
  TINING_CHEMICAL_FUND: "TINING_CHEMICAL_FUND",
  TINING_TOOL_FUND: "TINING_TOOL_FUND",
  TINING_EQUIPMENT_FUND: "TINING_EQUIPMENT_FUND",

  SALARY_FUND: "SALARY_FUND",
  RESERVE_FUND: "RESERVE_FUND",
  GROWTH_FUND: "GROWTH_FUND",
  LOYALTY_FUND: "LOYALTY_FUND",
  ACQUISITION_FUND: "ACQUISITION_FUND",
} as const;

export type FundType = (typeof FundTypeEnum)[keyof typeof FundTypeEnum];

export const FUND_TYPES_LABELS: Record<FundType, string> = {
  CUSTOM: "Обычный фонд",
  SYSTEM_FUND: "Системный фонд",

  BUSINESS_FUND: "Бизнес-затраты",
  BUSINESS_MATERIAL: "Материалы БЗ",
  BUSINESS_STORAGE: "Хранение БЗ",
  BUSINESS_EQUIPMENT: "Оборудование БЗ",

  MATERIAL_FUND: "Материалы",
  CONSUMABLE_FUND: "Одноразовые товары",
  CHEMICAL_FUND: "Химия",
  TOOL_FUND: "Инструменты",
  EQUIPMENT_FUND: "Оборудования",

  WRAPPING_MATERIAL_FUND: "Материалы (оклейка)",
  WRAPPING_CONSUMABLE_FUND: "Одноразовые товары (оклейка)",
  WRAPPING_TOOL_FUND: "Химия (оклейка)",
  WRAPPING_CHEMICAL_FUND: "Инструменты (оклейка)",
  WRAPPING_EQUIPMENT_FUND: "Оборудование (оклейка)",

  TINING_MATERIAL_FUND: "Материалы (тонировка)",
  TINING_CONSUMABLE_FUND: "Одноразовые товары (тонировка)",
  TINING_TOOL_FUND: "Химия (тонировка)",
  TINING_CHEMICAL_FUND: "Инструменты (тонировка)",
  TINING_EQUIPMENT_FUND: "Оборудование (тонировка)",

  SALARY_FUND: "Зарплата",
  RESERVE_FUND: "Финансовый резерв",
  GROWTH_FUND: "Развитие бизнеса",
  LOYALTY_FUND: "Карты лояльности",
  ACQUISITION_FUND: "Привлечение",
};

export const AcquiringTypeEnum = {
  NONE: "NONE",
  CARD: "CARD",
  QR: "QR",
} as const;

export type AcquiringType =
  (typeof AcquiringTypeEnum)[keyof typeof AcquiringTypeEnum];

export const ACQUIRING_TYPES_LABELS: Record<AcquiringType, string> = {
  NONE: "Отсутствует",
  CARD: "Карта",
  QR: "QR-код",
};
