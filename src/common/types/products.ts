import type { Service } from "./service";
import { ProductBatch } from "./stockMovements";
import type { Unit } from "./units";

export interface Product {
  id: number;
  name: string;
  shortName?: string;
  article?: string;
  conversionFactor: number;
  currentWriteoffPrice: number;
  currentConversionFactor: number;
  type: ProductType;
  status: ProductStatus;
  services: Service[];
  unitStorage: Unit;
  unitUsage: ProductUnitUsage;
  reserveValue: number;
  resourceValue: number;
  stockBalance: {
    quantity: number;
    resourceQuantity: number;
  };
  residualResource: number;
  lastBatch?: ProductBatch;
  writeoffOnePrice: number;
}

export interface ProductForm {
  productId: number;
  name?: string;
  shortName?: string | null;
  article?: string | null;
  type: ProductType;
  unitStorageId: number;
  unitStorageDisplay: string;
  unitUsage: ProductUnitUsage;
  conversionFactor: number;
  quantity: number;
  price: number;
  currentWriteoffPrice: number;
  fundId?: string | null;
}

export interface ProductAddForm {
  name: string;
  shortName?: string;
  article?: string;
  type: ProductType;
  unitStorageId: number;
  unitUsage: ProductUnitUsage;
  resourceValue: number;
  services?: number[] | null;
}

export interface ProductEditForm {
  name: string;
  shortName?: string;
  article?: string;
  type: ProductType;
  serviceIds: number[];
}

export const ProductStatusEnum = {
  ACTIVE: "ACTIVE",
  HIDDEN: "HIDDEN",
} as const;

export type ProductStatus =
  (typeof ProductStatusEnum)[keyof typeof ProductStatusEnum];

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  ACTIVE: "Активный",
  HIDDEN: "Скрытый",
};

export const ProductTypeEnum = {
  MATERIAL: "MATERIAL",
  CONSUMABLE: "CONSUMABLE",
  CHEMICAL: "CHEMICAL",
  TOOL: "TOOL",
  EQUIPMENT: "EQUIPMENT",

  WRAPPING_MATERIAL: "WRAPPING_MATERIAL",
  WRAPPING_CONSUMABLE: "WRAPPING_CONSUMABLE",
  WRAPPING_CHEMICAL: "WRAPPING_CHEMICAL",
  WRAPPING_TOOL: "WRAPPING_TOOL",
  WRAPPING_EQUIPMENT: "WRAPPING_EQUIPMENT",

  TINING_MATERIAL: "TINING_MATERIAL",
  TINING_CONSUMABLE: "TINING_CONSUMABLE",
  TINING_CHEMICAL: "TINING_CHEMICAL",
  TINING_TOOL: "TINING_TOOL",
  TINING_EQUIPMENT: "TINING_EQUIPMENT",

  BUSINESS_COST_MATERIAL: "BUSINESS_COST_MATERIAL",
  BUSINESS_COST_STORAGE: "BUSINESS_COST_STORAGE",
  BUSINESS_COST_EQUIPMENT: "BUSINESS_COST_EQUIPMENT",
} as const;

export type ProductType =
  (typeof ProductTypeEnum)[keyof typeof ProductTypeEnum];

export const PRODUCT_TYPES_LABELS: Record<ProductType, string> = {
  MATERIAL: "Материалы",
  CONSUMABLE: "Одноразка",
  CHEMICAL: "Химия",
  TOOL: "Инструмент",
  EQUIPMENT: "Оборудование",

  WRAPPING_MATERIAL: "Материалы (оклейка)",
  WRAPPING_CONSUMABLE: "Одноразка (оклейка)",
  WRAPPING_CHEMICAL: "Химия (оклейка)",
  WRAPPING_TOOL: "Инструмент (оклейка)",
  WRAPPING_EQUIPMENT: "Оборудование (оклейка)",

  TINING_MATERIAL: "Материалы (тонировка)",
  TINING_CONSUMABLE: "Одноразка (тонировка)",
  TINING_CHEMICAL: "Химия (тонировка)",
  TINING_TOOL: "Инструмент (тонировка)",
  TINING_EQUIPMENT: "Оборудование (тонировка)",

  BUSINESS_COST_MATERIAL: "Материалы БЗ",
  BUSINESS_COST_STORAGE: "Хранение БЗ",
  BUSINESS_COST_EQUIPMENT: "Оборудование БЗ",
};

export const ProductUnitUsageEnum = {
  YEARS: "YEARS",
  MONTHS: "MONTHS",
  DAYS: "DAYS",
  HOURS: "HOURS",
  MINUTES: "MINUTES",
  SERVICE_COUNT: "SERVICE_COUNT",
  SQUARE_METERS: "SQUARE_METERS",
  METERS: "METERS",
  GRAMS: "GRAMS",
  MILLILITERS: "MILLILITERS",
  PIECES: "PIECES",
} as const;

export type ProductUnitUsage =
  (typeof ProductUnitUsageEnum)[keyof typeof ProductUnitUsageEnum];

export const PRODUCT_UNIT_USAGE_LABELS: Record<ProductUnitUsage, string> = {
  PIECES: "Штуки",
  GRAMS: "Граммы",
  MILLILITERS: "Миллилитры",
  METERS: "Метры",
  SQUARE_METERS: "Метры²",
  SERVICE_COUNT: "Услуги",
  MINUTES: "Минуты",
  HOURS: "Часы",
  DAYS: "Дни",
  MONTHS: "Месяцы",
  YEARS: "Годы",
};

export const PRODUCT_UNIT_USAGE_LABELS_SHORT: Record<ProductUnitUsage, string> =
  {
    YEARS: "год",
    MONTHS: "мес",
    DAYS: "ден",
    HOURS: "час",
    MINUTES: "мин",
    SERVICE_COUNT: "усл",
    SQUARE_METERS: "м²",
    METERS: "м",
    GRAMS: "г",
    MILLILITERS: "мл",
    PIECES: "шт",
  };

export const TIME_UNITS = new Set([
  ProductUnitUsageEnum.MINUTES,
  ProductUnitUsageEnum.HOURS,
  ProductUnitUsageEnum.DAYS,
  ProductUnitUsageEnum.MONTHS,
  ProductUnitUsageEnum.YEARS,
]);

export const UNIT_USAGE_MAP: Record<ProductUnitUsage, number> = {
  [ProductUnitUsageEnum.MINUTES]: 1,
  [ProductUnitUsageEnum.HOURS]: 60,
  [ProductUnitUsageEnum.DAYS]: 60 * 8,
  [ProductUnitUsageEnum.MONTHS]: 60 * 8 * 30,
  [ProductUnitUsageEnum.YEARS]: 60 * 8 * 30 * 12,
  [ProductUnitUsageEnum.PIECES]: 1,
  [ProductUnitUsageEnum.GRAMS]: 1,
  [ProductUnitUsageEnum.MILLILITERS]: 1,
  [ProductUnitUsageEnum.METERS]: 1,
  [ProductUnitUsageEnum.SQUARE_METERS]: 1,
  [ProductUnitUsageEnum.SERVICE_COUNT]: 1,
};

export const WriteOffModeTypeEnum = {
  QUANTITY: "QUANTITY",
  RESOURCE_QUANTITY: "RESOURCE_QUANTITY",
} as const;

export type WriteOffModeType =
  (typeof WriteOffModeTypeEnum)[keyof typeof WriteOffModeTypeEnum];

export interface ProductWriteOffForm {
  conversionFactor?: number;
  writeoffPrice?: number;
  comment?: string;
}

export interface WriteoffPriceHistory {
  productId: number;
  productName: string;
  total: number;
  unitStorage: string;
  unitUsage: ProductUnitUsage;
  items: WriteoffPriceHistoryItem[];
}

export interface WriteoffPriceHistoryItem {
  id: number;
  conversionFactor: number;
  createdAt: string;
  price: number;
  priceOne: number;
  comment: string;
}
