import { Service } from "@entities/service";
import { ProductGroup } from "@features/assign-product-group";

export interface Product {
  id: number;
  name: string;
  shortName?: string;
  article?: string;
  conversionFactor: number;
  currentWriteoffPrice: number;
  currentConversionFactor: number;
  type: ProductType;
  services: Service[];
  unitStorage: ProductUnitStorage;
  unitUsage: ProductUnitUsage;
  unitStorages: ProductUnitStorages;
  unitPack: number;
  reserveValue: number;
  resourceValue: number;
  // status: ProductStatus;
  // stockBalance: {
  //   quantity: number;
  //   resourceQuantity: number;
  // };
  // residualResource: number;
  // lastBatch?: ProductBatch;
  // writeoffOnePrice: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  shortName?: string;
  type: ProductType;
  unitUsage: ProductUnitUsage;
  unitStorage: ProductUnitStorage;
  stockBalance: {
    quantity: number;
    resourceQuantity: number;
  };
  lastBatch: {
    price: number;
    receivedAt: string;
  };
  currentWriteoffPrice: number;
  reserveValue: number;
  productGroup?: ProductGroup;
}

export interface ProductUnitStorage {
  id: number;
  name: string;
  shortName: string;
}

export const ProductTypeEnum = {
  MATERIAL: "MATERIAL",
  CONSUMABLE: "CONSUMABLE",
  CHEMICAL: "CHEMICAL",
  TOOL: "TOOL",
  EQUIPMENT: "EQUIPMENT",
  PARFUME: "PARFUME",

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
  PARFUME: "Парфюм",

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

export const productTypesTools = new Set<ProductType>([
  ProductTypeEnum.TOOL,
  ProductTypeEnum.EQUIPMENT,
  ProductTypeEnum.WRAPPING_TOOL,
  ProductTypeEnum.WRAPPING_EQUIPMENT,
  ProductTypeEnum.TINING_TOOL,
  ProductTypeEnum.TINING_EQUIPMENT,
]);

export const PRODUCT_TYPES_ORDER: ProductType[] = [
  ProductTypeEnum.CONSUMABLE,
  ProductTypeEnum.EQUIPMENT,
  ProductTypeEnum.TOOL,
  ProductTypeEnum.MATERIAL,
  ProductTypeEnum.CHEMICAL,
  ProductTypeEnum.PARFUME,
];

export const PRODUCT_TYPES_COLORS: Record<ProductType, string> = {
  MATERIAL: "#81155f",
  CONSUMABLE: "#0c9184",
  CHEMICAL: "#616538",
  TOOL: "#103f8b",
  EQUIPMENT: "#c63f3f",
  PARFUME: "#9e60a6",

  WRAPPING_MATERIAL: "#81155f",
  WRAPPING_CONSUMABLE: "#0c9184",
  WRAPPING_CHEMICAL: "#616538",
  WRAPPING_TOOL: "#103f8b",
  WRAPPING_EQUIPMENT: "#c63f3f",

  TINING_MATERIAL: "#81155f",
  TINING_CONSUMABLE: "#0c9184",
  TINING_CHEMICAL: "#616538",
  TINING_TOOL: "#103f8b",
  TINING_EQUIPMENT: "#c63f3f",

  BUSINESS_COST_MATERIAL: "#81155f",
  BUSINESS_COST_STORAGE: "#0c9184",
  BUSINESS_COST_EQUIPMENT: "#c63f3f",
};

export const ProductUnitStoragesEnum = {
  PIECES: "PIECES",
  PACKS: "PACKS",
} as const;

export type ProductUnitStorages =
  (typeof ProductUnitStoragesEnum)[keyof typeof ProductUnitStoragesEnum];

export const PRODUCT_UNIT_STORAGES_LABELS: Record<ProductUnitStorages, string> =
  {
    PIECES: "Штука",
    PACKS: "Упаковка",
  };

export const PRODUCT_UNIT_STORAGES_LABELS_WRAP: Record<
  ProductUnitStorages,
  string
> = {
  PIECES: "шт",
  PACKS: "В 1 упаковке",
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

export type TimeUnit =
  | (typeof ProductUnitUsageEnum)["MINUTES"]
  | (typeof ProductUnitUsageEnum)["HOURS"]
  | (typeof ProductUnitUsageEnum)["DAYS"]
  | (typeof ProductUnitUsageEnum)["MONTHS"]
  | (typeof ProductUnitUsageEnum)["YEARS"];

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

export interface ProductCreateDto {
  name: string;
  shortName: string | null;
  article: string | null;
  type: ProductType;
  services: number[];
  unitUsage: ProductUnitUsage;
  unitStorages: ProductUnitStorages;
  unitPack: number;
  resourceValue: number;
}

export type ProductEditDto = ProductCreateDto;

export interface ProductWriteOffPrice {
  productId: number;
  writeOffPrice: number;
}

export interface ProductWriteOffPriceEditDto {
  historyDate: Date;
  writeOffPrice: number;
  comment: string;
}
