export interface MoneySource {
  id: string;
  name: string;
  type: MoneySourceType;
  balance: number;
}

export interface MoneySourceSearchOption {
  id: string;
  name: string;
}

export const MoneySourceTypeEnum = {
  CASH: "CASH",
  BANK_ACCOUNT: "BANK_ACCOUNT",
} as const;

export const MoneySourceTypeIdEnum = {
  CASH: "a772d929-10b6-46be-bc71-51cfcab09965",
  BANK_ACCOUNT: "df20b8b3-6d09-46b5-aa2e-09ea687339b3",
} as const;

export type MoneySourceType =
  (typeof MoneySourceTypeEnum)[keyof typeof MoneySourceTypeEnum];

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
