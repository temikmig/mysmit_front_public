import { ClientSource } from "@entities/clientSource";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  loyaltyСardNum?: string;
  loyaltyСardLevel?: LoyaltyCardLevel;
  sex?: ClientSex;
  birthday?: string;
  clientSource?: ClientSource;
  clientSourceId: string;
  loyaltyBalance: number;
  cars?: Car[];
  checklistsCount: number;
  lastChecklist?: {
    id: string;
    name: string;
  };
}

export interface ClientSearchOption {
  id: string;
  name: string;
  subtitle?: string;
  object: Client;
}

export type ClientCarSearchOption = {
  id: string;
  name: string;
  subtitle?: string;
  object: Car;
};

export const ClientSexEnum = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export type ClientSex = (typeof ClientSexEnum)[keyof typeof ClientSexEnum];

export const CLIENT_SEX_LABELS: Record<ClientSex, string> = {
  MALE: "Мужской",
  FEMALE: "Женский",
};

export interface ClientCreateDto {
  firstName: string;
  lastName: string | null;
  birthday: Date | null;
  phone: string;
  sex: ClientSex | null;
  loyaltyСardNum: string | null;
  loyaltyСardLevel: LoyaltyCardLevel | null;
  carMark: string;
  carModel: string;
  carYear: string | null;
  carColor: string | null;
  carNumber: string | null;
  clientSourceId: string | null;
}

export interface ClientEditDto {
  firstName: string;
  lastName: string | null;
  birthday: Date | null;
  phone: string;
  sex: ClientSex | null;
  loyaltyСardNum: string | null;
  loyaltyСardLevel: LoyaltyCardLevel | null;
  clientSourceId: string | null;
}

export interface Car {
  id: string;
  mark: string;
  model: string;
  year?: string;
  color?: string;
  number?: string;
  clientId: string;
}

export interface ClientCarCreateDto {
  mark: string;
  model: string;
  year: string | null;
  color: string | null;
  number: string | null;
  clientId: string;
}

export interface ClientCarEditDto {
  mark: string;
  model: string;
  year: string | null;
  color: string | null;
  number: string | null;
}

export const LoyaltyСardLevelEnum = {
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
  BRILLIANT: "BRILLIANT",
} as const;

export type LoyaltyCardLevel =
  (typeof LoyaltyСardLevelEnum)[keyof typeof LoyaltyСardLevelEnum];

export const LOYALTY_CARD_LEVEL_LABELS: Record<LoyaltyCardLevel, string> = {
  BRONZE: "BRONZE 1%",
  SILVER: "SILVER 3%",
  GOLD: "GOLD 5%",
  PLATINUM: "PLATINUM 7%",
  BRILLIANT: "BRILLIANT 10%",
};

export const LOYALTY_CARD_LEVEL_PERSENT: Record<LoyaltyCardLevel, number> = {
  BRONZE: 0.01,
  SILVER: 0.03,
  GOLD: 0.05,
  PLATINUM: 0.07,
  BRILLIANT: 0.1,
};

export const LOYALTY_CARD_LEVEL_COLORS: Record<LoyaltyCardLevel, string> = {
  BRONZE: "#cd7f32",
  SILVER: "#c0c0c0",
  GOLD: "#ffd700",
  PLATINUM: "#e5e4e2",
  BRILLIANT: "#b9f2ff",
};
