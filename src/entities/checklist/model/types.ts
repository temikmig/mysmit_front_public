import { Car, Client } from "@entities/client";
import { AcquiringType } from "@entities/moneySource";
import { ProductType, ProductUnitUsage } from "@entities/product";
import { Service } from "@entities/service";
import { ProductGroup } from "@features/assign-product-group";

export interface Checklist {
  id: string;
  status: ChecklistStatus;
  serviceId: number;
  service: Service;
  workTime: number;
  comment?: string;
  price: number;
  checklistDate: string;

  createdBy: ChecklstActionUser;
  confirmedBy?: ChecklstActionUser;
  approvedBy?: ChecklstActionUser;
  rejectedBy?: ChecklstActionUser & { comment: string };

  clientString?: string;
  clientId?: string;
  client?: ClientChecklist;

  clientCarString?: string;
  clientCarId?: string;
  clientCar?: Car;

  moneySourceId: string;
  moneySource: string;
  acquiringType: AcquiringType;

  checklistEmployees: ChecklistEmployee[];

  itemsComment?: string;
  checklistAnalytics: ChecklistAnalytics;
  checklistItems: ChecklistItem[];
}

export interface ChecklstActionUser {
  id: string;
  fullName: string;
  date: string;
}

export interface ChecklistItem {
  product: {
    id: number;
    name: string;
    shortName?: string;
    type: ProductType;
    unitUsage: ProductUnitUsage;
    productGroup?: ProductGroup;
  };
  usageItem: number;
  quantityUsed: number;
  writeoffPrice: number;
}

export interface ChecklistAnalytics {
  businessExpenses: number;
  directExpenses: number;
  toolEquipment: number;
  salary: number;
  financialReserve: number;
  businessGrowth: number;
  acquiring: number;
  loyalty: number;
  loyaltyWriteOff: number;
  acquisition: number;
  allCosts: number;
  profit: number;
  total: number;
}

export interface ChecklistEmployee {
  id: string;
  firstName: string;
  lastName: string;
  salary: number;
}

export interface ClientChecklist {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ChecklistListItem {
  id: string;
  checklistDate: string;
  serviceName: string;
  comment: string;
  price: number;
  workTime: number;
  client?: Client;
  clientString?: string;
  car?: Car;
  carString?: string;
  status: ChecklistStatus;
  checklistEmployees: ChecklistEmployee[];
}

export const ChecklistStatusEnum = {
  REJECTED: "REJECTED",
  AWAITING_SENIOR: "AWAITING_SENIOR",
  AWAITING_MANAGER: "AWAITING_MANAGER",
  APPROVED: "APPROVED",
} as const;

export type ChecklistStatus =
  (typeof ChecklistStatusEnum)[keyof typeof ChecklistStatusEnum];

export const CHECKLIST_STATUS_LABELS: Record<ChecklistStatus, string> = {
  REJECTED: "Отклонено",
  AWAITING_SENIOR: "На согласовании",
  AWAITING_MANAGER: "На подтверждениeи",
  APPROVED: "Подтвержден",
};

export const CHECKLIST_STATUS_COLORS: Record<ChecklistStatus, string> = {
  REJECTED: "#c3c3c3",
  AWAITING_SENIOR: "#c3c3c3",
  AWAITING_MANAGER: "#7c1111",
  APPROVED: "#3c3c3c",
};

export interface ChecklistEmployeesInput {
  employeeId: string;
  salary: number;
}

export interface ChecklistItemInput {
  productId: number;
  quantityUsed: number;
  writeoffPrice: number;
}

export interface ChecklistCreateDto {
  serviceId: number;
  clientId: string | null;
  clientString: string | null;
  clientCarId: string | null;
  clientCarString: string | null;
  isManualClient: boolean;
  checklistDate: Date;
  price: number;
  workTime: number;
  moneySourceId: string;
  acquiringType: AcquiringType;
  employees: ChecklistEmployeesInput[];
  items: ChecklistItemInput[];

  comment: string | null;
  itemsComment: string | null;

  businessExpenses: number;
  directExpenses: number;
  toolEquipment: number;
  salary: number;
  financialReserve: number;
  businessGrowth: number;
  acquiring: number;
  loyalty: number;
  loyaltyWriteOff: number;
  acquisition: number;
  allCosts: number;
  profit: number;
  total: number;
}

export type ChecklistEditDto = ChecklistCreateDto;

export interface ChecklistRejectDto {
  rejectedComment: string;
}

export interface ChecklistAllStats {
  rejected: number;
  awaitingSenior: number;
  awaitingManager: number;
  approved: number;
  total: number;
}

export interface ChecklistServiceProduct {
  id: number;
  name: string;
  shortName?: string;
  type: ProductType;
  unitStorageLabel: string;
  unitUsage: ProductUnitUsage;
  writeoffOnePrice: number;
  productGroup?: ProductGroup;
  unitPack?: number;
}

export interface ChecklistServiceData {
  postNumber: number;
  salaryPercent: number;
  products: ChecklistServiceProduct[];
}

export interface ChecklistReportItem extends ChecklistReportSums {
  id: string;
  checklistDate: string;
  serviceName: string;
}

export type ChecklistReportSums = ChecklistAnalytics & {
  price: number;
  workTime: number;
};

export interface ChecklistsReportList {
  checklists: ChecklistReportItem[];
  total: number;
  sums: ChecklistReportSums;
}
