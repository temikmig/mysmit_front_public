export interface ProductGroup {
  id: number;
  name: string;
  color: string;
}

export interface ProductGroupCreateDto {
  serviceId: number;
  name: string;
  color: string;
}

export interface ProductGroupEditDto {
  name: string;
  color: string;
}

export interface ActionProductGroup {
  groupId: number;
  productId: number;
}
