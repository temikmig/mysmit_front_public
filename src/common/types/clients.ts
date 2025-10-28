import { ClientSource } from "./clientSources";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  loyaltyСardNum?: string;
  loyaltyСardLevel?: LoyaltyСardLevel;
  sex?: ClientSex;
  birthday?: string | null;
  source?: ClientSource;
  sourceId: string;
  loyaltyBalance: number;
  cars: Car[];
  checklistsCount: number;
  lastChecklist: {
    id: string;
    createdAt: string;
    status: string;
    service: {
      id: number;
      name: string;
      color: string;
    };
  };
}

export interface ClientInput {
  firstName: string;
  lastName: string;
  phone: string;
  loyaltyСardNum?: string;
  loyaltyСardLevel: LoyaltyСardLevel;
  sex?: ClientSex;
  birthday: string | null;
  sourceId?: string;
  cars?: CarInput[];
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

export interface CarInput {
  mark: string;
  model: string;
  year?: string;
  color?: string;
  number?: string;
  clientId?: string;
}

export const ClientSexEnum = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export type ClientSex = (typeof ClientSexEnum)[keyof typeof ClientSexEnum];

export const CLIENT_SEX_LABELS: Record<ClientSex, string> = {
  MALE: "Мужской",
  FEMALE: "Женский",
};

export const LoyaltyСardLevelEnum = {
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
  BRILLIANT: "BRILLIANT",
} as const;

export type LoyaltyСardLevel =
  (typeof LoyaltyСardLevelEnum)[keyof typeof LoyaltyСardLevelEnum];

export const LOYALTY_CARD_LEVEL_LABELS: Record<LoyaltyСardLevel, string> = {
  BRONZE: "BRONZE 1%",
  SILVER: "SILVER 3%",
  GOLD: "GOLD 5%",
  PLATINUM: "PLATINUM 7%",
  BRILLIANT: "BRILLIANT 10%",
};

export const LOYALTY_CARD_LEVEL_PERSENT: Record<LoyaltyСardLevel, number> = {
  BRONZE: 0.01,
  SILVER: 0.03,
  GOLD: 0.05,
  PLATINUM: 0.07,
  BRILLIANT: 0.1,
};
