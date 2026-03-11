export interface ClientSource {
  id: string;
  name: string;
}

export interface ClientSourceCreateDto {
  name: string;
}

export interface ClientSourceSearchOption {
  id: string;
  name: string;
}

export type ClientSourceEditDto = ClientSourceCreateDto;
