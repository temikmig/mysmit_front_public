export interface Service {
  id: number;
  name: string;
  shortName: string;
  color: string;
  salaryPercent: number;
  postNumber: number;
}

export interface ServiceCreateDto {
  name: string;
  shortName: string | null;
  color: string;
  salaryPercent: number;
  postNumber: number;
}

export type ServiceEditDto = ServiceCreateDto;

export interface ServiceSearchOption {
  id: number;
  name: string;
  object?: Service;
}
