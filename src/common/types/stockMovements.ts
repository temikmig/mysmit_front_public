import type { Checklist } from "./checklists";
import { Inventory } from "./inventory";
import type { Product } from "./products";
import type { PurchaseInvoice } from "./purchaseInvoice";
import { Supplier } from "./supplier";

export interface StockMovement {
  id: number;
  productId: number;
  product: Product;
  type: StockMovementType;
  quantity?: number;
  resourceQuantity?: number;
  comment?: string;
  createdAt: string;
  checklistId?: string;
  checklist: Checklist;
  writeoffPrice?: number;
  reserveValue: number;
  isInventory?: boolean;
  inventoryId?: string;
  inventory?: Inventory;
  purchaseInvoiceId?: string;
  purchaseInvoice?: PurchaseInvoice;
}

export const StockMovementTypeEnum = {
  IN: "IN",
  OUT: "OUT",
} as const;

export type StockMovementType =
  (typeof StockMovementTypeEnum)[keyof typeof StockMovementTypeEnum];

export const STOCKMOVEMENTS_TYPE_LABELS: Record<StockMovementType, string> = {
  IN: "Поступление",
  OUT: "Списание",
};

export interface ProductBatch {
  id: number;
  productId: number;
  quantity: number;
  receivedAt: string;
  price: number;
  supplierId: number;
  supplier?: Supplier;
  supplierName: string;
  unitStorage: string;
  purchaseInvoiceId: string;
}

export interface OutMovementResponse {
  stockMovements: StockMovement;
  batches: ProductBatch[];
}

export interface CreateInMovement {
  productId: number;
  supplierId?: number;
  quantity: number;
  price: number;
}

export interface CreateOutMovement {
  productId: number;
  quantity: number;
  comment?: string;
}
