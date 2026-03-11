export interface BusinessConsts {
  id: string;
  businessCosts: number;
  businessGrowth: number;
  financialReserve: number;
  cardAcquiring: number;
  qrAcquiring: number;
  createdAt: string;
}

export interface BusinessConstsCreateDto {
  businessCosts: number;
  businessGrowth: number;
  financialReserve: number;
  cardAcquiring: number;
  qrAcquiring: number;
}
