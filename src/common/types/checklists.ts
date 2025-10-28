import type { UserRole } from "./users";
import type { Car, Client } from "./clients";
import { Employee } from "./employee";
import { ProductType, ProductUnitUsage } from "./products";
import { AcquiringType } from "./finances";

export interface ChecklistItem {
  id: number;
  checklistId: string;
  productId: number;
  quantityUsed: number;
  reserveValue: number;
  product: {
    id: number;
    name: string;
    shortName?: string;
    article?: string;
    unitStorageId?: number;
    unitUsage: ProductUnitUsage;
    currentWriteoffPrice: number;
    reserveValue: number;
    type?: ProductType;
  };
}

export const ChecklistStatusEnum = {
  DRAFT: "DRAFT",
  AWAITING_SENIOR: "AWAITING_SENIOR",
  AWAITING_MANAGER: "AWAITING_MANAGER",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  INVALID: "INVALID",
} as const;

export type ChecklistStatus =
  (typeof ChecklistStatusEnum)[keyof typeof ChecklistStatusEnum];

export const CHECKLIST_STATUS_LABELS: Record<ChecklistStatus, string> = {
  DRAFT: "Черновик",
  AWAITING_SENIOR: "На подтверждении старшим",
  AWAITING_MANAGER: "На подтверждении",
  APPROVED: "Подтвержден",
  REJECTED: "Отклонен",
  CANCELLED: "Отменен",
  INVALID: "Аннулирован",
};

export interface ChecklistFund {
  name: string;
  amount: number;
}

export interface ChecklistEmployee {
  id: string;
  checklistId: string;
  employee: Employee;
  employeeId: string;
  salary: number;
}

export interface Checklist {
  id: string;
  clientId: string;
  client: Client;
  car: Car;
  workerId: string;
  worker: {
    id: string;
    login: string;
    name: string;
    lastName: string;
    role: UserRole;
  };
  serviceId: number;
  service: {
    id: number;
    name: string;
    shortName: string;
    salaryPercent: number;
    color: string;
  };
  checklistEmployees: ChecklistEmployee[];
  workTime: number;
  createdAt: string;
  status: ChecklistStatus;
  comment?: string;
  items: ChecklistItem[];
  price: number;
  funds: ChecklistFund[];

  businessExpenses: number;
  directExpenses: number;
  toolEquipment: number;
  salary: number;
  financialReserve: number;
  businessGrowth: number;
  acquiring: number;
  loyalty: number;
  acquisition: number;
  total: number;
  profit: number;
}

export interface ChecklistMonth {
  checklists: Checklist[];
  total: number;
  sums: {
    workTime: number;
    businessExpenses: number;
    directExpenses: number;
    toolEquipment: number;
    salary: number;
    financialReserve: number;
    businessGrowth: number;
    acquiring: number;
    loyalty: number;
    acquisition: number;
    total: number;
    profit: number;
  };
}

export interface ChecklistListArgs {
  page?: number;
  limit?: number;
  search?: string;
  sortColumn?: keyof Checklist;
  sortOrder?: "asc" | "desc";
}

export interface ChecklistEmployee {
  employeeId: string;
  salary: number;
}

export interface ChecklistItem {
  productId: number;
  quantityUsed: number;
}

export interface CreateChecklistArgs {
  createdAt: string;
  clientId: string;
  clientCarId: string;
  serviceId: number;
  comment?: string;
  workTime: number;
  items: ChecklistItem[];
  price: number;
  loyaltyWriteOff?: number;
  sourceId: string;
  employees: { employeeId: string; salary: number }[];
  acquiringType: AcquiringType;

  businessExpenses: number;
  directExpenses: number;
  toolEquipment: number;
  salary: number;
  financialReserve: number;
  businessGrowth: number;
  acquiring: number;
  loyalty: number;
  acquisition: number;
  total: number;
  profit: number;
}

export interface FundReportItem {
  name: string;
  amount: number;
}

export interface ChecklistStats {
  totalChecklists: number;
  price: number;
  loyaltyWriteOff: number;
  businessExpenses: number;
  directExpenses: number;
  toolEquipment: number;
  specialFundExpenses: number;
  acquiring: number;
  funds: FundReportItem[];
}
