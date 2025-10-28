import { Product } from "./products";
import { Supplier } from "./supplier";
import { User } from "./users";

export const PurchaseInvoiceStatusEnum = {
  APPROVED: "APPROVED",
  CANCELLED: "CANCELLED",
  INVALID: "INVALID",
} as const;

export type PurchaseInvoiceStatus =
  (typeof PurchaseInvoiceStatusEnum)[keyof typeof PurchaseInvoiceStatusEnum];

export const PURCHASE_INVOICE_STATUS_LABELS: Record<
  PurchaseInvoiceStatus,
  string
> = {
  APPROVED: "Подтвержденная",
  CANCELLED: "Отмененная",
  INVALID: "Аннулированная",
};

export interface PurchaseInvoice {
  id: string;
  supplierId: number;
  supplier: Supplier;
  total: number;
  items: PurchaseItem[];
  status: PurchaseInvoiceStatus;
  createdByUser: User;
  createdAt: string;
  createdBy: string;
}

export interface PurchaseItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  resourceQuantity: number;
  price: number;
}

export interface PurchaseItemInput {
  productId: number;
  conversionFactor: number;
  quantity: number;
  price: number;
  currentWriteoffPrice: number;
  fundId?: string;
}

export interface PurchaseInvoiceInput {
  supplierId?: number;
  supplierName?: string;
  sourceId?: string;
  comment?: string;
  contactInfo?: string;
  createdAt?: string;
  items: PurchaseItemInput[];
}
