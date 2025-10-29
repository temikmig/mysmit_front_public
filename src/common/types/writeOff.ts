export interface StockMovementWriteOff {
  id: number;
  productId: number;
  quantity: number;
  comment?: string;
  writeoffPrice: number;
  reserveValue: number;
  createdAt: string;
}

export interface WriteOffArgs {
  productId: number;
  quantity?: number | null;
  resourceQuantity?: number | null;
  comment?: string | null;
}
