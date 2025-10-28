import { Product } from "./products";

export interface Service {
  id: number;
  name: string;
  shortName: string;
  color: string;
  salaryPercent: number;
}

export interface ServiceInput {
  name: string;
  shortName: string;
  color: string;
  salaryPercent: number;
}

export interface ProductsByService {
  id: number;
  name: string;
  salaryPercent: number;
  products: Product[];
}
