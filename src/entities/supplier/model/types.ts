export interface Supplier {
  id: number;
  name: string;
  contactInfo: string;
  isSupplier: boolean;
}

export interface SupplierCreateDto {
  name: string;
  contactInfo: string | null;
  isSupplier: boolean;
}

export type SupplierEditDto = SupplierCreateDto;
