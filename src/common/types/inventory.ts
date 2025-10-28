// export interface InventoryItem {
//   productId: number;
//   expectedQty: number;
//   countedQty: number;
//   difference: number;
//   comment?: string;
// }

import { Product } from "./products";

export interface InventoryItem {
  id: string;
  inventoryId: string;
  productId: number;
  expectedQty: number;
  expectedResourceQty: number;
  countedQty: number;
  countedResourceQty: number;
  differenceQty: number;
  differenceResource: number;
  diffWriteOffPrice: number;
  diffWriteOffOnePrice: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export const InventoryStatusEnum = {
  DRAFT: "DRAFT",
  AWAITING_MANAGER: "AWAITING_MANAGER",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type InventoryStatus =
  (typeof InventoryStatusEnum)[keyof typeof InventoryStatusEnum];

export const INVENTORY_STATUS_LABELS: Record<InventoryStatus, string> = {
  DRAFT: "Черновик",
  AWAITING_MANAGER: "На подтверждении",
  APPROVED: "Подтверждено",
  REJECTED: "Отклонено",
};

export interface Inventory {
  id: string;
  createdBy: string;
  createdByUser: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  inventoryDate: string;
  status: InventoryStatus;
  confirmedBy?: {
    firstName: string;
    lastName: string;
  };
  confirmedAt?: string;
  comment?: string;
  items?: InventoryItem[];
}

export interface CreateInventoryDto {
  inventoryDate: string;
  comment?: string;
  items: CreateInventoryItemDto[];
}

export interface CreateInventoryItemDto {
  productId: number;
  countedQty: number;
  countedResourceQty: number;
  diffWriteOffPrice: number;
  diffWriteOffOnePrice: number;
  comment?: string;
}

export interface ConfirmInventoryDto {
  confirmedBy: string;
}

export interface UpdateInventoryDto {
  comment?: string;
  status?: Inventory["status"];
}

export interface ConfirmInventoryDto {
  confirmedBy: string;
}
