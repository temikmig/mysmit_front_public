import { PaginationParams, SearchParams, SortParams } from "@shared/lib";

export type ApiResponse<T = void> = T extends void
  ? { message: string }
  : { data: T; message: string };

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface SearchRequest {
  search?: string;
  id?: string | number;
  limit?: number;
  skip?: boolean;
}

export type PaginatedQueryParams<T, F = unknown> = PaginationParams &
  SearchParams &
  SortParams<T> & { filters?: F };

export interface CreateRequest<T> {
  data: T;
}

export interface UpdateRequest<T, Id = string> {
  id: Id;
  data: T;
}

export type IdRequest<Id = string> = Id;

export type DeleteRequest<Id = string> = IdRequest<Id>;
